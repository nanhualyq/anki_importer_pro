# create a new menu item, "test"
from aqt import QAction, mw, qconnect

from .ImporterForm import ImporterForm


action = QAction("ImporterPro", mw)
# set it to call testFunction when it's clicked
qconnect(action.triggered, ImporterForm)
# and add it to the tools menu
mw.form.menuCol.addAction(action)
