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
    {path: '/', component: Homepage, as: 'home'},
    {path: '/board/:key', component: Board, as: 'board'},
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
