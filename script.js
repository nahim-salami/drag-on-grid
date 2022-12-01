var vpc_drag_in = [];
$(document).ready(function(){
    /* draggable element */
    var item = document.querySelectorAll('.metal-drag');

    item.forEach(element => {
        element.addEventListener('dragstart', dragStart);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.target.parentNode.classList.add("drag-start")
        
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);
    }


    /* drop targets */
    const boxes = document.querySelectorAll('.drop-targets');
    $( ".drop-targets" ).sortable();
    $( ".container" ).sortable();
    boxes.forEach(box => {
      //  box.addEventListener('dragstart', dragStart);
        box.addEventListener('dragenter', dragEnter)
        box.addEventListener('dragover', dragOver);
        box.addEventListener('dragleave', dragLeave);
        box.addEventListener('drop', drop);
    });


    function dragEnter(e) {
        e.preventDefault();
        if($(e.target).hasClass("drop-targets"))
            e.target.classList.add('drag-over');
    }

    function dragOver(e) {
        e.preventDefault();
        if($(e.target).hasClass("drop-targets")) {
            $(".drag-over").removeClass('drag-over');
            $(e.target).addClass('drag-over');
            //console.log(e.target)
        }
    }

    function dragLeave(e) {
        $(".drag-over").removeClass('drag-over');
    }

    function drop(e) {
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        let size = $(draggable).attr("data-size");
        let color = $(draggable).attr("data-color");
        let clone = $("#clonner").clone();

        let h = 0, w = 0;

        if(size == "4x4") {
           w = $(e.target).width() / 4;
           h = $(e.target).height()
        }
        else if(size == "4x8"){
            w = $(e.target).width() / 2;
            h = $(e.target).height()
        }
        else if(size == "4x16") {
            w = $(e.target).width();
            h = $(e.target).height()
        }

        var max_size = 0, active_size = parseInt(size.replace("4x", ""));
       
        if(typeof vpc_drag_in[e.target.id]  === "undefined") vpc_drag_in[e.target.id]  = 0
        max_size = vpc_drag_in[e.target.id] + active_size;

        if(typeof size !== "undefined" && max_size <= 16 && $(e.target).hasClass("drop-targets")) {
            vpc_drag_in[e.target.id] += active_size;
            clone.removeAttr("id");
            clone.attr("data-size", size)
            clone.attr("data-color", color);
            clone.css("background-color", color);
            clone.width(w);
            clone.height(h);
            clone.addClass("drag-in");
            clone.removeClass("color");
            if($(e.target).hasClass('drop-targets'))
                $(e.target).append(clone);
        }

    }
});