package org.wso2.developerstudio.eclipse.templates.dashboard.web.function.server;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.swt.widgets.Display;

public class GetWizardDetailsFunctionServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String wizardid = request.getParameter("status");
        response.setStatus(HttpServletResponse.SC_OK);
/*        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println("{ \"status\": \"ok\"}");*/
        JSEmbeddedFunctions jsf = new JSEmbeddedFunctions();
        String responseString = "{}";
        try {
            responseString = jsf.getDescription(wizardid);
            response.getWriter().println(responseString);
        } catch (CoreException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
