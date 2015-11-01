import {
    Component,
    View,
    bootstrap,
} from 'angular2/angular2';

import {
    RouterOutlet,
    RouteConfig,
    ROUTER_BINDINGS,
} from 'angular2/router';

import {SocketService} from 'socket/socket'
import {Homepage} from 'homepage/homepage';
import {Board} from 'board/board';

@RouteConfig([
    {path: '/app', component: Homepage, as: 'Home'},
    {path: '/app/board/:key', component: Board, as: 'Board'},
    {path: '/', redirectTo: '/app'},
])
@Component({
    selector: 'retroboard'
})
@View({
    directives: [RouterOutlet],
    templateUrl: 'retroboard.html',
})
class Retroboard {

}

bootstrap(Retroboard, [ROUTER_BINDINGS, SocketService]);
