import sys
from aqt import QDialog, QUrl, QVBoxLayout, mw
from aqt.webview import AnkiWebView

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
        layout = QVBoxLayout()
        self.webview = AnkiWebView(self)
        self.webview.set_open_links_externally(False)
        self.webview.load_url(QUrl(html_url))
        layout.addWidget(self.webview)
        self.setLayout(layout)
        self.setGeometry(100, 100, 800, 600)
        self.setWindowTitle("ImporterPro")
        self.exec()
