var removeAD = function() {
    if ($) {
        $("div").each(function() {
            var cl = $.trim($(this).attr("class"));
            if (cl.length == 41) {
                $(this).hide();
            }
        })
    }
}
setInterval(removeAD, 50);