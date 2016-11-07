/*
 * Thumbnail links demo
 */
app.controller('SearchResultThumbnailContainerAfterController', ['angularLoad', function (angularLoad) {
    var vm = this;
    
    /*
     * Get central catalog unique identifier
     */ 
    vm.acnumber = '';
    if ('addsrcrecordid' in vm.parentCtrl.item.pnx.control) {
        vm.acnumber = vm.parentCtrl.item.pnx.control.addsrcrecordid[0];
    }
    /*
     * Get fulltext and table-of-contents pnx.links.linkstorsrc links
     */ 
    vm.thumb_links = [];
    if ('linktorsrc' in vm.parentCtrl.item.pnx.links) {
        var numLinks = vm.parentCtrl.item.pnx.links['linktorsrc'].length;
        for (var i=0; i < numLinks; i++) {
            var link = vm.parentCtrl.item.pnx.links['linktorsrc'][i];

            if (link.match(/\$\$U([^$]+)\$\$[ED](.*)/)) {
                var link_href = RegExp.$1;
                var link_text = RegExp.$2;

                if (link_text.match(/(Fulltext|Volltext)/)) {
                    vm.thumb_links.push([ link_href, 'Volltext' ]);
                } else if (link_text.match(/(Table of Contents|Inhaltsverzeichnis)/)) {
                    vm.thumb_links.push([ link_href, 'Inhalts-verzeichnis' ]);
                }
            }
        }
    }
}]);

app.component('prmSearchResultThumbnailContainerAfter', {
    bindings: {parentCtrl: '<'},
    controller: 'SearchResultThumbnailContainerAfterController',
    template: `<div ng-if="$ctrl.acnumber"><small>{{$ctrl.acnumber}}</small></div>
        <div ng-repeat="link in $ctrl.thumb_links">
           <a href="{{link[0]}}">{{link[1]}}</a>
        </div>`
});
