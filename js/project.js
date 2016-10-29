$(function(){
    
    var model = {
        "OngoingProjects" : {
            "Multi-projection Project" : {
                "Information" : { 
                    "Full-name" : "Development of Realistic Media and Presentation System for Large Auditorium",
                    "Team": "EVE",
                    "Area": "Immersive media display system, Multi-projection contents optimization",
                    "Partners":"KAI Co., CJ CGV Co."
                },
                "Results" : {
                    "Image" : ""
                },
                "Funding" : {
                    "Image" : "",
                    "About" : ""
                },
                "Manager" : {
                    "Image" : "",
                    "Name" : ""
                }
            }, 
            "Curved-projection Project" : {
                "Information" : { 
                    "Full-name" : "Development of Realistic Media and Presentation System for Large Auditorium",
                    "Team": "EVE",
                    "Area": "Immersive media display system, Multi-projection contents optimization",
                    "Partners":"KAI Co."
                },
                "Results" : {
                    "Image" : ""
                },
                "Funding" : {
                    "Image" : "",
                    "About" : ""
                },
                "Manager" : {
                    "Image" : "",
                    "Name" : ""
                }
            }
        },
        
        init : function() {
        },
        getAllOnProjects : function() {
            // ok without this
            var onProjects = JSON.stringify(model.OngoingProjects);
            return JSON.parse(onProjects);
        }
        
    };
    
    var octopus = {
        
        getOnProjects : function() {
            return model.getAllOnProjects();
        },
        
        init: function() {
            model.init();
            view.init();
        }
    };
    
    var view = {
        init: function() {
            // this는 view상에서 공유되는 var
            this.onProjectList = $('#onProjectList');
            
            // init 에서 한번 render 해줘야한다.
            view.render();
        },
        
        render: function() {
            var htmlStr='';
//            octopus.getOnProjects().forEach(function(project){
            $.each(octopus.getOnProjects(), function(name, project){
                htmlStr += '<li class="infoTitle">' + name + '</li>';
                $.each(project.Information, function(entryIndex, entry){
                    htmlStr += '<li class="infoIndex">' +
                        '<span>' + entryIndex + ' : ' +
                        '</span>' + entry + '</li>';
                });
            });
            
            // html에 집어넣는다.
            this.onProjectList.html( htmlStr );
        }
    };
    
    octopus.init();
    
}) //end