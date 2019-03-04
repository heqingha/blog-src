/*!
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.7
 *
 */
(function($, window, document, undefined) {
    var $window = $(window);
    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        function update() {
            var counter = 0;
            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                    /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    /* if we found an image we'll load, reset the counter */
                    counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
            settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
            !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);

/**
 * Local Search
 * @author https://github.com/theme-next/hexo-theme-next
 */
var LocalSearch = {
    searchPath: '',
    trigger: 'auto',
    topN: '1',
    unescape: false,
    isfetched: false,
    isXml: true,
    initParams: function (data) {
        LocalSearch.searchPath = data.dbPath;
        LocalSearch.trigger = data.trigger;
        LocalSearch.topN = data.topN;
        LocalSearch.unescape = data.unescape === 'false' ? false : true;
        if (LocalSearch.searchPath.length === 0) {
            LocalSearch.searchPath = "/search.xml";
        } else if (/json$/i.test(LocalSearch.searchPath)) {
            LocalSearch.isXml = false;
        }
    },
    onPopupClose: function () {
        $('.popup').hide();
        $('#local-search-input').val('');
        $('.search-result-list').remove();
        $('#no-result').remove();
        $(".local-search-pop-overlay").remove();
        $('body').css('overflow', '');
    },
    proceedsearch: function () {
        $("body").append('<div class="search-popup-overlay local-search-pop-overlay"></div>').css('overflow', 'hidden');
        $('.search-popup-overlay').click(LocalSearch.onPopupClose);
        $('.popup').toggle();
        var $localSearchInput = $('#local-search-input');
        $localSearchInput.attr("autocapitalize", "none");
        $localSearchInput.attr("autocorrect", "off");
        $localSearchInput.focus();
    },
    // search function;
    searchFunc: function (search_id, content_id) {
        // if loading exists then return.
        if (!$('.search-popup-overlay').is(':visible')) {
            // start loading animation
            $("body").append('<div class="search-popup-overlay local-search-pop-overlay">' +
                '<div id="search-loading-icon">' +
                '<i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>' +
                '</div>' +
                '</div>').css('overflow', 'hidden');
            $("#search-loading-icon").css('margin', '20% auto 0 auto').css('text-align', 'center');
        } else {
            alert("Fetching data...don't worry")
        }
        var input = document.getElementById(search_id);
        var resultContent = document.getElementById(content_id);
        if (!input || !resultContent) {
            console.error('Elements not exists with searchId: '+search_id+', resultContentId: '+content_id);
            return;
        }
        if (LocalSearch.unescape) {
            // ref: https://github.com/ForbesLindesay/unescape-html
            var unescapeHtml = function(html) {
                return String(html)
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, '\'')
                    .replace(/&#x3A;/g, ':')
                    // replace all the other &#x; chars
                    .replace(/&#(\d+);/g, function (m, p) { return String.fromCharCode(p); })
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&amp;/g, '&');
            };
        }
        $.ajax({
            url: LocalSearch.searchPath,
            timeout: 5000,
            dataType: LocalSearch.isXml ? "xml" : "json",
            async: true,
            success: function (res) {
                // get the contents from search data
                LocalSearch.isfetched = true;
                $('.popup').detach().appendTo('body');
                var datas = LocalSearch.isXml ? $("entry", res).map(function () {
                    return {
                        title: $("title", this).text(),
                        content: $("content", this).text(),
                        url: $("url", this).text()
                    };
                }).get() : res;
                var inputEventFunction = function () {
                    var searchText = input.value.trim().toLowerCase();
                    var keywords = searchText.split(/[\s\-]+/);
                    if (keywords.length > 1) {
                        keywords.push(searchText);
                    }
                    var resultItems = [];
                    if (searchText.length > 0 && Array.isArray(datas)) {
                        for (let data of datas) {
                            if (!data || !data.content) continue;
                            var isMatch = false;
                            var hitCount = 0;
                            var searchTextCount = 0;
                            var title = data.title.trim();
                            var titleInLowerCase = title.toLowerCase();
                            var content = data.content.trim().replace(/<[^>]+>/g, "");
                            if (LocalSearch.unescape && content) {
                                content = unescapeHtml(content);
                            }
                            var contentInLowerCase = content.toLowerCase();
                            var articleUrl = decodeURIComponent(data.url).replace(/\/{2,}/g, '/');
                            var indexOfTitle = [];
                            var indexOfContent = [];
                            // only match articles with not empty titles
                            if (title != '') {
                                keywords.forEach(function (keyword) {
                                    function getIndexByWord(word, text, caseSensitive) {
                                        var wordLen = word.length;
                                        if (wordLen === 0) {
                                            return [];
                                        }
                                        var startPosition = 0, position = [], index = [];
                                        if (!caseSensitive) {
                                            text = text.toLowerCase();
                                            word = word.toLowerCase();
                                        }
                                        while ((position = text.indexOf(word, startPosition)) > -1) {
                                            index.push({position: position, word: word});
                                            startPosition = position + wordLen;
                                        }
                                        return index;
                                    }

                                    indexOfTitle = indexOfTitle.concat(getIndexByWord(keyword, titleInLowerCase, false));
                                    indexOfContent = indexOfContent.concat(getIndexByWord(keyword, contentInLowerCase, false));
                                });
                                if (indexOfTitle.length > 0 || indexOfContent.length > 0) {
                                    isMatch = true;
                                    hitCount = indexOfTitle.length + indexOfContent.length;
                                }
                            }
                            // show search results
                            if (isMatch) {
                                // sort index by position of keyword
                                [indexOfTitle, indexOfContent].forEach(function (index) {
                                    index.sort(function (itemLeft, itemRight) {
                                        if (itemRight.position !== itemLeft.position) {
                                            return itemRight.position - itemLeft.position;
                                        } else {
                                            return itemLeft.word.length - itemRight.word.length;
                                        }
                                    });
                                });

                                // merge hits into slices
                                function mergeIntoSlice(text, start, end, index) {
                                    var item = index[index.length - 1];
                                    var position = item.position;
                                    var word = item.word;
                                    var hits = [];
                                    var searchTextCountInSlice = 0;
                                    while (position + word.length <= end && index.length != 0) {
                                        if (word === searchText) {
                                            searchTextCountInSlice++;
                                        }
                                        hits.push({position: position, length: word.length});
                                        var wordEnd = position + word.length;

                                        // move to next position of hit

                                        index.pop();
                                        while (index.length != 0) {
                                            item = index[index.length - 1];
                                            position = item.position;
                                            word = item.word;
                                            if (wordEnd > position) {
                                                index.pop();
                                            } else {
                                                break;
                                            }
                                        }
                                    }
                                    searchTextCount += searchTextCountInSlice;
                                    return {
                                        hits: hits,
                                        start: start,
                                        end: end,
                                        searchTextCount: searchTextCountInSlice
                                    };
                                }

                                var slicesOfTitle = [];
                                if (indexOfTitle.length != 0) {
                                    slicesOfTitle.push(mergeIntoSlice(title, 0, title.length, indexOfTitle));
                                }

                                var slicesOfContent = [];
                                while (indexOfContent.length != 0) {
                                    var item = indexOfContent[indexOfContent.length - 1];
                                    var position = item.position;
                                    var word = item.word;
                                    // cut out 100 characters
                                    var start = position - 20;
                                    var end = position + 80;
                                    if (start < 0) {
                                        start = 0;
                                    }
                                    if (end < position + word.length) {
                                        end = position + word.length;
                                    }
                                    if (end > content.length) {
                                        end = content.length;
                                    }
                                    slicesOfContent.push(mergeIntoSlice(content, start, end, indexOfContent));
                                }
                                // sort slices in content by search text's count and hits' count
                                slicesOfContent.sort(function (sliceLeft, sliceRight) {
                                    if (sliceLeft.searchTextCount !== sliceRight.searchTextCount) {
                                        return sliceRight.searchTextCount - sliceLeft.searchTextCount;
                                    } else if (sliceLeft.hits.length !== sliceRight.hits.length) {
                                        return sliceRight.hits.length - sliceLeft.hits.length;
                                    } else {
                                        return sliceLeft.start - sliceRight.start;
                                    }
                                });

                                // select top N slices in content
                                var upperBound = parseInt(LocalSearch.topN);
                                if (upperBound >= 0) {
                                    slicesOfContent = slicesOfContent.slice(0, upperBound);
                                }
                                // highlight title and content

                                function highlightKeyword(text, slice) {
                                    var result = '';
                                    var prevEnd = slice.start;
                                    slice.hits.forEach(function (hit) {
                                        result += text.substring(prevEnd, hit.position);
                                        var end = hit.position + hit.length;
                                        result += '<b class="search-keyword">' + text.substring(hit.position, end) + '</b>';
                                        prevEnd = end;
                                    });
                                    result += text.substring(prevEnd, slice.end);
                                    return result;
                                }

                                var resultItem = '';

                                if (slicesOfTitle.length != 0) {
                                    resultItem += "<li><a href='" + articleUrl + "' class='search-result-title'>" + highlightKeyword(title, slicesOfTitle[0]) + "</a>";
                                } else {
                                    resultItem += "<li><a href='" + articleUrl + "' class='search-result-title'>" + title + "</a>";
                                }

                                slicesOfContent.forEach(function (slice) {
                                    resultItem += "<a href='" + articleUrl + "'>" +
                                        "<p class=\"search-result\">" + highlightKeyword(content, slice) +
                                        "...</p>" + "</a>";
                                });

                                resultItem += "</li>";
                                resultItems.push({
                                    item: resultItem,
                                    searchTextCount: searchTextCount,
                                    hitCount: hitCount,
                                    id: resultItems.length
                                });
                            }
                        }
                    }
                    if (keywords.length === 1 && keywords[0] === "") {
                        resultContent.innerHTML = '<div id="no-result"><i class="fa fa-search fa-5x"></i></div>'
                    } else if (resultItems.length === 0) {
                        resultContent.innerHTML = '<div id="no-result"><i class="fa fa-frown-o fa-5x"></i></div>'
                    } else {
                        resultItems.sort(function (resultLeft, resultRight) {
                            if (resultLeft.searchTextCount !== resultRight.searchTextCount) {
                                return resultRight.searchTextCount - resultLeft.searchTextCount;
                            } else if (resultLeft.hitCount !== resultRight.hitCount) {
                                return resultRight.hitCount - resultLeft.hitCount;
                            } else {
                                return resultRight.id - resultLeft.id;
                            }
                        });
                        var searchResultList = '<ul class=\"search-result-list\">';
                        resultItems.forEach(function (result) {
                            searchResultList += result.item;
                        });
                        searchResultList += "</ul>";
                        resultContent.innerHTML = searchResultList;
                    }
                };

                if ('auto' === LocalSearch.trigger) {
                    input.addEventListener('input', inputEventFunction);
                } else {
                    $('.search-icon').click(inputEventFunction);
                    input.addEventListener('keypress', function (event) {
                        if (event.keyCode === 13) {
                            inputEventFunction();
                        }
                    });
                }
                // remove loading animation
                $(".local-search-pop-overlay").remove();
                $('body').css('overflow', '');
                LocalSearch.proceedsearch();
            },
            error: function (xhr,status,error) {
                alert(status+', Load error when get '+ LocalSearch.searchPath);
                console.error(error);
                window.location.reload(true);
            }
        });
    },
    doSearch: function (e) {
        e && e.stopPropagation();
        if (!LocalSearch.isfetched) {
            LocalSearch.searchFunc('local-search-input', 'local-search-result');
        } else {
            LocalSearch.proceedsearch();
        }
    }
};
// SimpleCore
var SimpleCore = {
    buildingTime: new Date(),
    current: null,
    prevTop: 0,
    headerShow: true,
    snsQRCode: null,
    donateImg: null,
    localSearch: {},
    initParams: function (params) {
        SimpleCore.buildingTime = params.buildingTime;
        SimpleCore.current = params.current;
        SimpleCore.snsQRCode = params.snsQRCode;
        SimpleCore.donateImg = params.donateImg;
        SimpleCore.localSearch = params.localSearch;
    },
    //外部调用初始化
    init: function (params) {
        SimpleCore.initParams(params);
        LocalSearch.initParams(SimpleCore.localSearch);
        $(window).resize(function () {
            SimpleCore.syncSize();
        });
        $(window).scroll(function (e) {
            SimpleCore.scrollCallback();
        });
        $(document).on('click', '.btn-read-mode', function (e) {
            e.preventDefault();
            SimpleCore.switchReadMode();
        });
        $(document).on('click', '.btn-search', function (e) {
            e.preventDefault();
            SimpleCore.switchSearch();
        });
        $(document).on('click', '#local-search-input-tip', function (e) {
            LocalSearch.doSearch(e);
        });
        $(document).on('click', '.popup-btn-close', function (e) {
            e.preventDefault();
            LocalSearch.onPopupClose();
        });
        $(document).on('click', '.popup', function (e) {
            e.stopPropagation();
        });
        $(document).on('click', '.btn-sns-qr', function (e) {
            e.preventDefault();
            if (SimpleCore.snsQRCode != '') {
                SimpleCore.alert('订阅号：前端也疯狂','<img style="width:180px;background:#fff;" src="' + SimpleCore.snsQRCode + '">');
            } else {
                SimpleCore.alert('未开通自定义功能','<h4 style="text-align: center;margin: 0">联系博主试试看 ：）</h4>');
            }
        });
        $(document).on('click', '.btn-thumbs-up', function (e) {
            e.preventDefault();
            if (SimpleCore.donateImg != '') {
                SimpleCore.alert('点个赞，你高兴就好','<img style="width:180px;background:#fff;" src="' + SimpleCore.donateImg + '">');
            } else {
                SimpleCore.alert('未开通自定义功能','<h4 style="text-align: center;margin: 0">联系博主试试看 ：）</h4>');
            }
        });
        $(document).on('click', '.btn-gotop', function (e) {
            e.preventDefault();
            SimpleCore.goTop();
        });
        SimpleCore.changeReadModel();
        SimpleCore.setPageCurrent();
        SimpleCore.setBuildingTime();
        SimpleCore.syncSize();
        SimpleCore.printGreeting();
        SimpleCore.lazyLoadPostsImages();
        SimpleCore.registerESCKeyEvent();
        SimpleCore.registerFKeyEvent();
    },
    goTop: function () {
        $("html, body").animate({scrollTop: 0}, 200);
    },
    setPageCurrent: function () {
        if (SimpleCore.current === 'post') {
            $('#cover').hide();
            $('body').addClass('single');
        } else {
            $('#cover').show();
            $('body').removeClass('single');
        }
        $.each($('.nav-menu a'), function (k, v) {
            if (v.href == window.location.href) {
                $(v).addClass('current');
            } else {
                $(v).removeClass('current');
            }
        });
    },
    scrollCallback: function () {
        var top = document.documentElement.scrollTop
            || document.body.scrollTop
            || 0;
        if (top > 100) {
            $('.fixed-btn').show();
        } else {
            $('.fixed-btn').hide();
        }
        if ($('body').hasClass('single')) {
            SimpleCore.headerShow = (top < 100 || (SimpleCore.prevTop - top) > 0) ? true : false;
            SimpleCore.headerToggle();
        }
        SimpleCore.prevTop = top;
    },
    headerToggle: function () {
        if (SimpleCore.headerShow) {
            $('.page-title').css("top", 0);
            $('.nav-user').css("top", 0);
            if ($(window).width() < 480) {
                $('#nav').css("top", 0);
            }
        } else {
            $('.page-title').css("top", -45);
            $('.nav-user').css("top", -45);
            if ($(window).width() < 480) {
                $('#nav').css("top", -45);
            }
        }
    },
    syncSize: function () {	//同步窗口大小
        var pageTitle = $('.page-title');
        var size = $(window).width();
        if (size > 768 && SimpleCore.current != 'post') {
            pageTitle.width($('#body > .main').width());
        } else {
            pageTitle.removeAttr('style');
        }
        if (size < 768) {
            $('.site-name').click(function (e) {
                e.preventDefault();
            });
        }
    },
    switchSearch: function () {
        var srh = $('#search');
        if (srh.hasClass('active')) {
            srh.removeClass('active');
        } else {
            srh.addClass('active');
        }
    },
    switchReadMode: function () {
        var next_mode = $('body').hasClass('night-mode') ? 'day' : 'night';
        SimpleCore.setLocalData('read-mode', next_mode);
        SimpleCore.changeReadModel();
    },
    changeReadModel: function () {
        var btn = $('.btn-read-mode');
        if (SimpleCore.getLocalData('read-mode') == 'night') {
            $('body').addClass('night-mode');
            btn.find('i').attr('class', 'fa fa-moon-o');
            $(".cover-img").css({
                'background': "url('/blog/images/cover-night.jpg')",
                'background-image': '/blog/images/cover-night.jpg',
                'background-size': 'cover',
                'background-position': 'center',
                'background-repeat': 'no-repeat'
            });
        } else {
            $('body').removeClass('night-mode');
            btn.find('i').attr('class', 'fa fa-sun-o');
            $(".cover-img").css({
                'background': "url('/blog/images/cover-day.jpg')",
                'background-image': '/blog/images/cover-day.jpg',
                'background-size': 'cover',
                'background-position': 'center',
                'background-repeat': 'no-repeat'
            });
        }
    },
    alert: function (title,msg) {
        var id = 'notice-' + (new Date().getTime());
        var html = '<div id="' + id + '" class="notice-item">'
            + '<span class="notice-item-close"><i class="fa fa-close"></i></span>'
            + '<p><h3 style="text-align: center;margin:0 0 10px 0">'+title+'</h3>' + msg + '</p></div>';
        var notice = $('#notice');
        if (notice.length == 0) {
            $('<div id="notice"></div>').appendTo($('body'));
        }
        $(html).appendTo($('#notice')).on('click', '.notice-item-close', function () {
            $(this).parent().remove();
            return false;
        });
        //居中显示，于8秒后自动关闭
        $('#notice').css('margin-right', -$('#notice').width() / 2);
        setTimeout(function () {
            $('#' + id).remove();
        }, 8000);
    },
    setLocalData: function (key, value) {
        if (window.localStorage) {
            window.localStorage.setItem(key, value);
        }
    },
    getLocalData: function (key) {
        if (window.localStorage) {
            return window.localStorage.getItem(key);
        }
    },
    setBuildingTime: function () {
        var urodz = new Date(SimpleCore.buildingTime);  //建站时间
        var now = new Date();
        var ile = now.getTime() - urodz.getTime();
        var buildingDays = Math.floor(ile / (1000 * 60 * 60 * 24));
        $('#cpYear').html(now.getFullYear());
        $('#siteBuildingTime').html(buildingDays);
        return buildingDays;
    },
    printGreeting: function () {
        var asciiTxt = " _   _         _    _              _       _              _        _ \n" +
            "( ) ( )       (_ ) (_ )           ( )  _  ( )            (_ )     ( )\n" +
            "| |_| |   __   | |  | |    _      | | ( ) | |   _    _ __ | |    _| |\n" +
            "|  _  | /'__`\\ | |  | |  /'_`\\    | | | | | | /'_`\\ ( '__)| |  /'_` |\n" +
            "| | | |(  ___/ | |  | | ( (_) )   | (_/ \\_) |( (_) )| |   | | ( (_| |\n" +
            "(_) (_)`\\____)(___)(___)`\\___/'   `\\___x___/'`\\___/'(_)  (___)`\\__,_)\n" +
            "\n已稳定运行 " + this.setBuildingTime() + " 天，拦截了无数次逗比攻击！🎉🎉🎉\n    ";
        console.log("%c\n"+asciiTxt, "color: #527fe2; font-family:KaiTi;font-size: 16px");
    },
    lazyLoadPostsImages: function() {
        $('body').find('img').lazyload({
            //placeholder: '/blog/images/loading.gif',
            effect   : 'fadeIn',
            threshold: 2,
            failure_limit: 3
        });
    },
    /**
     * Press ESC to hide server pop :)
     */
    registerESCKeyEvent: function() {
        $(document).on('keyup', function(event) {
            var shouldDismissSearchPopup = event.which === 27
                && $('.search-popup').is(':visible');
            if (shouldDismissSearchPopup) {
                $('.search-popup').hide();
                $('.search-popup-overlay').remove();
                $('body').css('overflow', '');
            }
        });
    },
    /**
     * Press F to active local-search
     */
    registerFKeyEvent: function(e) {
        $(document).on('keyup', function(event) {
            var shouldShowSearchPopup = event.which === 70
                && $('.search-popup').is(':hidden');
            if (shouldShowSearchPopup) {
                LocalSearch.doSearch(e);
            }
        });
    }
};
