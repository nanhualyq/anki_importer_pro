# create a new menu item, "test"
from aqt import QAction, mw, qconnect

from .ImporterDialog import ImporterDialog

action = QAction("Importer Pro", mw)
# set it to call testFunction when it's clicked
qconnect(action.triggered, ImporterDialog)
# and add it to the tools menu
mw.form.menuCol.addAction(action)
