

var colorOrange = "#f47a20";
var colorOrange2 = "#ffffff";
var colorBorder = "#ffffff";
var rectAnimationDuration = 50;

var centerLogo;

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    totalHeight = w.innerHeight || e.clientHeight || g.clientHeight;

var animationDuration = 250;

function setViewPortFullScreen(duration) {
    svgArea.animate({viewBox: (cx - 650 / 2) + ' ' + (cy - 650 / 2) + ' ' + 650 + ' ' + 650}, duration);
}

function loadWelcomeNodes() {
    var contributionsString = GetIDEDashboardWizards();
    var contributions = JSON.parse(contributionsString);
    var welcomeNodes = [];
    contributions.forEach(function (contribution) {
        var welcomeNode = {};
        welcomeNode.title = contribution.name;
        //welcomeNode.title = welcomeNode.title.split(/ /g)[0];
        welcomeNode.icon = contribution.iconURL;
        welcomeNode.nodes = [];
        contribution.wizards.forEach(function (wizard) {
            var wizardNode = {};
            wizardNode.title = wizard.id;
            wizardNode.wizardID = wizard.name;
            wizardNode.priority = wizard.priority;
            welcomeNode.nodes.push(wizardNode);
        });
        welcomeNodes.push(welcomeNode);
    });
    return welcomeNodes;
}

var welcomeNodeArray = loadWelcomeNodes();

/*var mavenWizard = "org.wso2.developerstudio.eclipse.platform.ui.mvn.wizard.MvnMultiModuleWizard";
var cappWizard = 'org.wso2.developerstudio.eclipse.distribution.project';
var serverWizard = 'org.eclipse.wst.server.ui.new.server';

if((GetWizardDescription(mavenWizard) != null)){
    welcomeNodeArray.push({title: "Maven", nodes: [
        {title: '', wizardID: mavenWizard}
    ]});
}

if((GetWizardDescription(cappWizard) != null)){
    welcomeNodeArray.push({title: "CApp", nodes: [
        {title: '', wizardID: cappWizard}
    ]});
}

if((GetWizardDescription(serverWizard) != null)){
    welcomeNodeArray.push({title: "Add runtime", nodes: [
        {title: '', wizardID: serverWizard}
    ]});
}*/

$(window).resize(function () {
    $('.wso2-logo').css("left", $(".header").width() - $('.wso2-logo').width() - $('.devs-logo').width() - 40);
    location.reload();
});

welcomeNodeArray.forEach(function (welcomeNode) {
	$("#root-container").append("<h1>" + welcomeNode.title + "</h1>" );
	welcomeNode.nodes.forEach(function (childNode) {
		escapedChildTitle = childNode.title.replace(/\./g, '');
		$("#root-container").append("<h3><a id='"+escapedChildTitle+"'>" + GetWizardDescription(childNode.wizardID) +"</a></h3>"); 
		
		$("#"+escapedChildTitle).click(function(){
			OpenIDEWizard(childNode.wizardID);
	    });
	});
	
});

/*welcomeNodeArray.forEach(function (welcomeNode) {
    var line1Endpoint = getEndpointForPath(angleOffset + count * anglePerMainItem, cr);
    var line2Endpoint = getEndpointForPath(angleOffset + count * anglePerMainItem, 250);
    var line = svgArea.line(cx, cy, line1Endpoint.x, line1Endpoint.y)
        .insertBefore(centerCircle)
        .attr({strokeWidth: 10, stroke: colorBorder, strokeLinecap: "round", opacity: 100, filter: ""})
        .animate({x1: cx, y1: cy, x2: line2Endpoint.x, y2: line2Endpoint.y }, animationDuration);
    addCenteredText(line2Endpoint.x, line2Endpoint.y, welcomeNode);
    var circle = svgArea.circle(line1Endpoint.x, line1Endpoint.y, cr)
        .insertBefore(welcomeNode.text)
        .attr({fill: colorOrange, stroke: colorBorder, strokeWidth: 0})
        .hover(function () {
            if (selectedNode != welcomeNode) {
                circle.animate({strokeWidth: 10}, 200);
            }
        }, function () {
            if (selectedNode != welcomeNode) {
                circle.animate({strokeWidth: 0}, 200);
            }
        })
        .animate({ cx: line2Endpoint.x, cy: line2Endpoint.y}, animationDuration, null, function () {
            welcomeNode.text.animate({opacity: 100}, 400);
            welcomeNode.image.animate({opacity: 100}, 400);
        })

        .addClass("childCircle");
    line.data("dataNode", welcomeNode);
    circle.data("dataNode", welcomeNode);
    welcomeNode.point = line2Endpoint;
    welcomeNode.line = line;
    welcomeNode.circle = circle;

    var expandNodes = function () {
        var childX0 = parseInt(circle.attr('cx')) + 2 * parseInt(circle.attr('r'));
        var childY0 = parseInt(circle.attr('cy')) - parseInt(circle.attr('r')) / 2;
        var childMargin = 10;
        var childHeight = 30;
        var rectWidth = 300;
        var maxPerColumn = 8;
        if (selectedNode == welcomeNode) {
            setSelectedNode(null);
            setTimeout(
                function () {
                    setViewPortFullScreen(400);
                    showUnselectedNodes();
                },
                    welcomeNode.nodes.length * rectAnimationDuration);
            return;
        }
        setSelectedNode(welcomeNode);
        hideUnselectedNodes();
        setViewPortToChild(circle, rectWidth + 50, childHeight + childMargin, maxPerColumn);
        setTimeout(function () {
            var count = 0;
            welcomeNode.nodes.forEach(function (childNode) {
                if(GetWizardDescription(childNode.wizardID) == null){
                    return;
                }
                var color = colorOrange2;
                if (count % 2 == 0) {
                    color = colorOrange;
                }
                childNode.x = childX0;
                childNode.y = childY0;
                childNode.rect = svgArea.rect(childNode.x, childNode.y, 0, 0, 10).attr({fill: color, stroke: colorBorder, strokeWidth: 0}).data("dataNode", childNode).hover(function () {
                    childNode.rect.animate({strokeWidth: 5}, 100);
                }, function () {
                    childNode.rect.animate({strokeWidth: 0}, 100);
                }).click(function () {
                    OpenIDEWizard(childNode.wizardID);
                })
                    .addClass('handPointer');
                childNode.icon = addImageForChild(childNode).hover(function () {
                    childNode.rect.animate({strokeWidth: 5}, 100);
                }, function () {
                    childNode.rect.animate({strokeWidth: 0}, 100);
                }).click(function () {
                    OpenIDEWizard(childNode.wizardID);
                })
                    .addClass('handPointer');
                childNode.text = addTextForChild(childNode).hover(function () {
                    childNode.rect.animate({strokeWidth: 5}, 100);
                }, function () {
                    childNode.rect.animate({strokeWidth: 0}, 100);
                }).click(function () {
                    OpenIDEWizard(childNode.wizardID);
                })
                    .addClass('handPointer');
                setTimeout(function () {
                    childNode.rect.animate({width: rectWidth, height: childHeight}, rectAnimationDuration);
                    childNode.icon.animate({opacity: 100}, rectAnimationDuration);
                    childNode.text.animate({opacity: 100}, rectAnimationDuration);
                }, count * rectAnimationDuration);
                count++;
                childY0 += (childMargin + childHeight);
                if (count % maxPerColumn == 0) {
                    childX0 += rectWidth + childMargin;
                    childY0 = parseInt(circle.attr('cy')) - parseInt(circle.attr('r')) / 2 + childMargin;
                    setViewPortToChild(circle, (1 + count / maxPerColumn) * rectWidth + (2 * childMargin * count / maxPerColumn), childHeight + childMargin, welcomeNode.nodes.length);
                }
            });
        }, animationDuration + 250);
    };
    if (welcomeNode.nodes.length === 1) {
        circle.click(function () {
            OpenIDEWizard(welcomeNode.nodes[0].wizardID);
        });
        welcomeNode.text.click(function () {
            OpenIDEWizard(welcomeNode.nodes[0].wizardID);
        });
        welcomeNode.image.click(function () {
            OpenIDEWizard(welcomeNode.nodes[0].wizardID);
        });
    } else {
        circle.click(expandNodes);
        welcomeNode.image.click(expandNodes);
        welcomeNode.text.click(expandNodes);
    }
    welcomeNode.image.hover(function () {
        if (selectedNode != welcomeNode) {
            circle.animate({strokeWidth: 10}, 200);
        }
    }, function () {
        if (selectedNode != welcomeNode) {
            circle.animate({strokeWidth: 0}, 200);
        }
    });
    welcomeNode.text.hover(function () {
        if (selectedNode != welcomeNode) {
            circle.animate({strokeWidth: 10}, 200);
        }
    }, function () {
        if (selectedNode != welcomeNode) {
            circle.animate({strokeWidth: 0}, 200);
        }
    });

    if ($("#pageRow").width() < 80) {
        location.reload();
    }

    circle.hover(function () {

    }, function () {

    });
    count++;

});*/

function setOpacityOfLogo(op, dur) {
    centerLogo.select('#circle3041').animate({opacity: op}, dur);
    centerLogo.select('#path3043').animate({opacity: op}, dur);
    centerLogo.select('#path3045').animate({opacity: op}, dur);
}

function hideUnselectedNodes() {
    if (selectedNode != null) {
        centerCircle.animate({opacity: 0}, animationDuration);
        setOpacityOfLogo(0, animationDuration);
        centeredMainText.animate({opacity: 0}, animationDuration);
        welcomeNodeArray.forEach(function (node) {
            node.line.animate({opacity: 0}, animationDuration / 5);
            if (node != selectedNode) {
                node.circle.animate({opacity: 0}, animationDuration);
                node.text.animate({opacity: 0}, animationDuration);
                node.image.animate({opacity: 0}, animationDuration);
            }
        });
    }
}

function showUnselectedNodes() {
    centerCircle.animate({opacity: 100}, animationDuration);
    setOpacityOfLogo(100, animationDuration);
    centeredMainText.animate({opacity: 100}, animationDuration);
    welcomeNodeArray.forEach(function (node) {
        node.line.animate({opacity: 100}, animationDuration);
        if (node != selectedNode) {
            node.circle.animate({opacity: 100}, animationDuration);
            node.text.animate({opacity: 100}, animationDuration);
            node.image.animate({opacity: 100}, animationDuration);
        }
    });
}

$('#zoomInIconP').click(function () {
    setSelectedNode(null);
    setTimeout(function () {
        setViewPortFullScreen(400);
        showUnselectedNodes();
    }, animationDuration);
});

