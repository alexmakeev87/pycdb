/** * Created by 1ka on 4/5/14. */ZOOMPYCDB.namespace("ZOOMPYCDB.GraphController");ZOOMPYCDB.GraphController = function (model, view) {    var view = view,        storage = model.storage,        temp_data = model.temp;    $(document).on("node_clicked", function (event, d) {        var chosen_rel = temp_data.getChosenRel(),            chosen_source = temp_data.getChosenSource();        //when we chose rid and source of new relation        if (chosen_rel != undefined) {            if (chosen_source != undefined) {                storage.addRelation(chosen_rel.id, temp_data.getChosenSource(), d);                temp_data.setChosenSource(undefined);                temp_data.setChosenRel(undefined);                view.closeDragLine();                storage.unhighlight();            }            //when we chose rid            else {                temp_data.setChosenSource(d);                storage.highlightRelTargets(chosen_rel, d);                view.addDragLine(chosen_rel, {x: d.x, y: d.y});            }        }        //when we picked an object to watch information        else {            storage.unhighlight();            //frame around chosen node            d.chosen = true;            storage.changeNode(d);            temp_data.setNode(d);        }    });    $(document).on("rel_clicked", function (event, d) {        storage.unhighlight();        temp_data.setRelation(d);    });    $(document).on("graph_mouse_moved", function (e, event) {        view.moveDragLine();        view.changeSelectionRect(event);        $(document).trigger("close_selection");    });    $(document).on("graph_mouse_down", function (e, event) {        if (event.shiftKey) {            view.removeSelectionRect();            storage.cleanSelection();            view.startSelectionRect();        }    });    $(document).on("graph_mouse_click", function () {        temp_data.setChosenSource(undefined);        temp_data.setChosenRel(undefined);        view.closeDragLine();        //view.refresh();        //storage.unhighlight();    });    $(document).on("graph_mouse_up", function () {        if (!view.isSelectionClosed()) {            view.closeSelectionRect();            storage.closeSelection(view.getSelectionRect());        }    });    $(document).on("close_selection", function () {        if (!view.isSelectionClosed()) {            storage.closeSelection(view.getSelectionRect());        }    });    $(document).on("ctrl+c", function () {        temp_data.setFragment(storage.getSelectedFragment(view.getSelectionRect()));    });    $(document).on("ctrl+x", function () {        temp_data.setFragment(storage.getSelectedFragment(view.getSelectionRect()));        storage.removeSelectedFragment();        view.closeSelectionRect();        view.removeSelectionRect();    });    $(document).on("ctrl+v", function () {        var selection, rect;        if (view.isMouseOver()) {            view.closeSelectionRect();            view.removeSelectionRect();            storage.closeSelection(view.getSelectionRect());            selection = temp_data.getFragment(view.getMouseCoord());            rect = selection.rect;            storage.pasteFragment(selection);            view.addSelectionRect(rect.x, rect.y, rect.width, rect.height);        }    });    $(document).on("node_moved", function (event, node) {        storage.changeNodeCoord(node);    });    $(document).on("drag_ended", function (event, node) {        storage.saveNodeCoord(node);    });    $(document).on("selection_moved", function () {        var shift = view.getShift();        view.moveSelectionRect(shift);        storage.moveSelection(shift);    });    $(document).on("end_move_selection", function () {        view.endMoveSelectionRect();        storage.saveSelectionCoord();    });    return{    }}