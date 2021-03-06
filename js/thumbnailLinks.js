/*
 * Thumbnail links demo
 * Ulrich Leodolter <ulrich.leodolter@obvsg.at>
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
    if (vm.parentCtrl.links.length > 0) {
        vm.parentCtrl.links.forEach(function(link, i, links) {
            if (link.linkType == 'http://purl.org/pnx/linkType/linktorsrc') {
                if (link.displayLabel.match(/(Fulltext|Volltext)/)) {
                    vm.thumb_links.push([ link.linkURL, 'Volltext' ]);
                } else if (link.displayLabel.match(/(Table of Contents|Inhaltsverzeichnis)/)) {
                    vm.thumb_links.push([ link.linkURL, 'Inhalts-verzeichnis' ]);
                }
            }
        });
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
