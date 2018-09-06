package org.wso2.developerstudio.eclipse.templates.dashboard.web.function.server;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class GetWizardsFunctionServlet extends HttpServlet {
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);
        JSEmbeddedFunctions jsf = new JSEmbeddedFunctions();
        response.getWriter().println(jsf.getWizardsList());
    }
}
