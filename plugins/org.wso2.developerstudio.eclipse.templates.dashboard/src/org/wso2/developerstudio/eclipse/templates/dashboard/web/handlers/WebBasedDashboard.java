/**
 * Copyright 2009-2018 WSO2, Inc. (http://wso2.com)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.wso2.developerstudio.eclipse.templates.dashboard.web.handlers;

import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.jface.dialogs.ErrorDialog;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.IEditorSite;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.part.MultiPageEditorPart;
import org.wso2.developerstudio.eclipse.logging.core.IDeveloperStudioLog;
import org.wso2.developerstudio.eclipse.logging.core.Logger;
import org.wso2.developerstudio.eclipse.templates.dashboard.Activator;
import org.wso2.developerstudio.eclipse.templates.dashboard.web.handlers.WebBasedDashboardPage;

public class WebBasedDashboard extends MultiPageEditorPart {

	private static IDeveloperStudioLog log = Logger.getLog(Activator.PLUGIN_ID);
	private WebBasedDashboardPage webDashboard;
    private EditorContentFunction editorContentFunction;

    @Override
    protected void createPages() {
        webDashboard = new WebBasedDashboardPage(this);
        int index;
        try {
            index = addPage(webDashboard, getEditorInput());
            setPageText(index, WebDashBoardEditorConstants.GUI_EDITOR_NAME);
            webDashboard.setEditorFunctionExecutor(editorContentFunction);
        } catch (PartInitException e) {
            ErrorDialog.openError(getSite().getShell(), WebDashBoardEditorConstants.ERROR_CREATING_UI_EDITOR, null,
                    e.getStatus());
        }
        // createPage2();
    }

    @Override
    public void doSave(IProgressMonitor arg0) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void doSaveAs() {
        // TODO Auto-generated method stub
        
    }

    @Override
    public boolean isSaveAsAllowed() {
        // TODO Auto-generated method stub
        return false;
    }

}
