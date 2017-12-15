/**
 * 正文内容分段处理
 * @param {jQueryObject/HTMLElement/String}  $content 要处理的正文jQ对象或HTMLElement或其对应选择器
 */
function splitConent($content) {
    $content = $($content);
    $content.find(splitConfig.unitTag).each(function (index, item) {
        var $item = $(item),
            text = $.trim($item.text());
        if (!text) return;
        var nodes = $item[0].childNodes;
        $.each(nodes, function (i, node) {
            switch (node.nodeType) {
                case 3:
                    // text 节点
                    // 由于是文本节点，标签被转义了，后续再转回来
                    node.data = '<' + splitConfig.wrapTag + '>' +
                        node.data.replace(splitConfig.splitReg, '</' + splitConfig.wrapTag + '>$&<' + splitConfig.wrapTag + '>') +
                        '</' + splitConfig.wrapTag + '>';
                    break;
                case 1:
                    // 元素节点
                    var innerHtml = node.innerHTML,
                        start = '',
                        end = '';
                    // 如果内部还有直接标签，先去掉
                    var startResult = /^<\w+?>/.exec(innerHtml);
                    if (startResult) {
                        start = startResult[0];
                        innerHtml = innerHtml.substr(start.length);
                    }
                    var endResult = /<\/\w+?>$/.exec(innerHtml);
                    if (endResult) {
                        end = endResult[0];
                        innerHtml = innerHtml.substring(0, endResult.index);
                    }
                    // 更新内部内容
                    node.innerHTML = start +
                        '<' + splitConfig.wrapTag + '>' +
                        innerHtml.replace(splitConfig.splitReg, '</' + splitConfig.wrapTag + '>$&<' + splitConfig.wrapTag + '>') +
                        '</' + splitConfig.wrapTag + '>' +
                        end;
                    break;
                default:
                    break;
            }
        });
        // 处理文本节点中被转义的html标签
        $item[0].innerHTML = $item[0].innerHTML
            .replace(new RegExp('&lt;' + splitConfig.wrapTag + '&gt;', 'g'), '<' + splitConfig.wrapTag + '>')
            .replace(new RegExp('&lt;/' + splitConfig.wrapTag + '&gt;', 'g'), '</' + splitConfig.wrapTag + '>');
        $item.find(splitConfig.wrapTag).addClass(splitConfig.wrapCls);
    });
}