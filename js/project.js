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
                    "Image" : "imgs/project_img_01_650.jpg"
                },
                "Funding" : {
                    "Image" : "imgs/black_110x50.png",
                    "About" : "Institute for Information & communications Techonology Promotion"
                },
                "Manager" : {
                    "Image" : "imgs/black_80x80.png",
                    "Name" : "Bumki Kim"
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
                    "Image" : "imgs/project_img_02_650.jpg"
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
            var projectHeader='';
//            octopus.getOnProjects().forEach(function(project){
            $.each(octopus.getOnProjects(), function(name, project){
                projectHeader = name; 
                
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