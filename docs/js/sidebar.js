function add_tree_node(parent_el, id){
    var node = RALIndex[id];
    
    var div;
    div = document.createElement("div");
    div.id = "node" + id;
    div.dataset.id = id;
    div.className = "node";
    parent_el.appendChild(div);
    
    var icon;
    icon = document.createElement("div");
    icon.className = "node-icon";
    icon.onclick = onClickTreeFold;
    div.appendChild(icon);
    
    var link = document.createElement("a");
    link.href = "#" + get_path(id, null, false);
    link.className = "node-link";
    link.onclick = onClickTreeLink;
    if("dims" in node){
        var txt = node.name;
        for(var i=0; i<node.dims.length; i++) {
            txt += "[]";
        }
        link.innerHTML = txt;
    }else{
        link.innerHTML = node.name;
    }
    div.appendChild(link);
    
    if(node.children.length > 0){
        // has children
        div.classList.add("closed");
        
        var cdiv;
        cdiv = document.createElement("div");
        cdiv.className = "node-children";
        parent_el.appendChild(cdiv);
        
        for(var i=0; i<node.children.length; i++){
            add_tree_node(cdiv, node.children[i]);
        }
    } else {
        // is leaf node
        div.classList.add("leaf");
    }
}

function init_tree() {
    var el = document.getElementById("sb-tree");
    add_tree_node(el, 0);
}

function select_tree_node() {
    var id = CurrentID;
    // Changes the selected tree node
    var selected = document.getElementsByClassName("selected");
    for(var i=selected.length-1; i>=0; i--){
        selected[i].classList.remove("selected");
    }
    var el = document.getElementById("node" + id);
    el.classList.add("selected");
}

function open_tree_node(id) {
    var el = document.getElementById("node" + id);
    if(el.classList.contains("leaf")) return;
    
    el.classList.add("open")
    el.classList.remove("closed")
}

function close_tree_node(id) {
    var el = document.getElementById("node" + id);
    if(el.classList.contains("leaf")) return;
    
    el.classList.add("closed")
    el.classList.remove("open")
}

function expand_to_tree_node() {
    // Expand tree nodes as needed to make id visible
    var el;
    var id = CurrentID;
    
    // Expand parents as needed
    while(RALIndex[id].parent !== null) {
        id = RALIndex[id].parent;
        open_tree_node(id);
    }
}

function scroll_to_tree_node(id) {
    var node_el = document.getElementById("node" + id);
    var tree_el = document.getElementById("sb-tree");
    
    var node_rect = node_el.getBoundingClientRect();
    var tree_rect = tree_el.getBoundingClientRect();
    
    if((node_rect.top < tree_rect.top) || (node_rect.bottom > tree_rect.bottom)) {
        if(typeof node_el.scrollIntoView === "function") { 
            node_el.scrollIntoView();
        }
    }
}

function sidebar_open() {
    document.getElementById("sidebar").style.display = "flex";
    document.getElementById("overlay").style.display = "block";
}

function sidebar_close() {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function onClickTreeFold(ev) {
    var el = ev.target.parentNode;
    if(el.classList.contains("leaf")) return;
    
    if(el.classList.contains("closed")){
        // Open this node
        el.classList.add("open")
        el.classList.remove("closed")
    }else{
        // Close this node
        el.classList.add("closed")
        el.classList.remove("open")
    }
}

function onClickTreeLink(ev) {
    var el = ev.target.parentNode;
    var id = parseInt(el.dataset.id);
    
    close_search();
    
    if(id == CurrentID) return(false);
    
    if(!el.classList.contains("leaf")){
        el.classList.add("open");
        el.classList.remove("closed");
    }
    
    reset_indexes_to_next(id);
    load_page(id);
    select_tree_node();
    refresh_url();
    refresh_title();
    sidebar_close();
    return(false);
}

function onClickTreeExpandAll() {
    var els = document.getElementsByClassName("closed");
    for(var i=els.length-1; i>=0; i--){
        els[i].classList.add("open");
        els[i].classList.remove("closed");
    }
}

function onClickTreeCollapseAll() {
    var els = document.getElementsByClassName("open");
    for(var i=els.length-1; i>=0; i--){
        els[i].classList.add("closed");
        els[i].classList.remove("open");
    }
}