$(function(){
    
    var model = {
        "OngoingProjects" : {
            "Multi_projection_Project" : {
                "Full-name" : "Development of Realistic Media and Presentation System for Large Auditorium",
                "Team": "EVE",
                "Area": "Immersive media display system, Multi-projection contents optimization",
                "Partners":"KAI Co., CJ CGV Co."
            }, 
            "Curved_projection_Project" : {
                "Full-name" : "Development of Realistic Media and Presentation System for Large Auditorium",
                "Team": "EVE",
                "Area": "Immersive media display system, Multi-projection contents optimization",
                "Partners":"KAI Co."
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
            console.log(octopus.getOnProjects());
//            octopus.getOnProjects().forEach(function(project){
            $.each(octopus.getOnProjects(), function(name, project){
                htmlStr += '<li class="InfoTitle">' + name + '</li>';
                $.each(project, function(entryIndex, entry){
                    htmlStr += '<li class="infoIndex">' + entry + '</li>';
                });
            });
            
            // html에 집어넣는다.
            this.onProjectList.html( htmlStr );
        }
    };
    
    octopus.init();
    
}) //end