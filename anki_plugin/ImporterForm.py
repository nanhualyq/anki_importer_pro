import json
import sys
from aqt import QDialog, QUrl, QVBoxLayout, gui_hooks, mw
from aqt.webview import AnkiWebView
from anki.notes import Note
from anki.collection import AddNoteRequest

ADDON_PACKAGE_NAME = mw.addonManager.addonFromModule(__name__)  # 假设在同一个插件模块中

# 只能全部打平到第一层，递归不了
mw.addonManager.setWebExports(
    ADDON_PACKAGE_NAME,
    r"web/.*",  # 正则表达式匹配你想要导出的文件
)
html_url = AnkiWebView.webBundlePath(f"/_addons/{ADDON_PACKAGE_NAME}/web/index.html")
if "--debug" in sys.argv:
    html_url = "http://localhost:9000/"


class ImporterForm(QDialog):
    def __init__(self):
        super().__init__()

        self.setGeometry(100, 100, 800, 600)
        self.setWindowTitle("ImporterPro")

        layout = QVBoxLayout()
        self.set_webview()
        layout.addWidget(self.webview)
        self.setLayout(layout)

        self.exec()

    def set_webview(self):
        self.webview = AnkiWebView(self)
        self.webview.set_bridge_command(self._on_bridge_cmd, self)
        self.webview.set_open_links_externally(False)
        self.webview.load_url(QUrl(html_url))

    def _on_bridge_cmd(self, cmd: str):
        if cmd == "getDecks":
            return [
                {"id": x.id, "name": x.name}
                for x in mw.col.decks.all_names_and_ids(include_filtered=False)
            ]
        elif cmd == "getNotetypes":
            return mw.col.models.all()
        elif cmd == "save":
            self.webview.evalWithCallback("window._data", self.handleSave)

    def handleSave(self, data):
        requests = []
        for item in data["notes"]:
            note = Note(mw.col, int(data["notetypeId"]))
            for key, val in item.items():
                note[key] = val
            requests.append(AddNoteRequest(note, int(data["deckId"])))
        changes = mw.col.add_notes(requests)
        gui_hooks.operation_did_execute(changes, None)
        js_code = f'onPythonMessage("onNotesCreated", {json.dumps([r.note.id for r in requests])})'
        self.webview.eval(js_code)
