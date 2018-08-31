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
package org.wso2.developerstudio.eclipse.templates.dashboard.web.functions;

import org.eclipse.swt.browser.Browser;
import org.eclipse.swt.browser.BrowserFunction;
import org.wso2.developerstudio.eclipse.logging.core.IDeveloperStudioLog;
import org.wso2.developerstudio.eclipse.logging.core.Logger;
import org.wso2.developerstudio.eclipse.platform.ui.Activator;

/**
 * This class defines GetIDEDashboardWizards function which returns a json of list of categories and 
 * corresponding wizards registered to the category.
 *  Call this function in JS with GetIDEDashboardWizards();
 */
public class GetDashboardWizardContributionsFunction extends BrowserFunction {

    private static IDeveloperStudioLog log = Logger.getLog(Activator.PLUGIN_ID);

    public GetDashboardWizardContributionsFunction(Browser browser) {
        super(browser, "GetIDEDashboardWizards"); //Call this function in JS with GetIDEDashboardWizards();
    }

    @Override
    public Object function(Object[] arguments) {
        return DashboardContributionsHandler.getCategoriesJson();
    }
}
