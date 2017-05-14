import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';
import { DocumentsComponent } from './documents/documents.component';
import { ProposalListComponent } from './proposal/proposal-list.component';
import { ProposalNewComponent } from './proposal/proposal-new.component';
import { ProposalShowComponent } from './proposal/proposal-show.component';

import { PostclipComponent } from './postclip/postclip.component';
import { PostclipNewComponent } from './postclip/postclip-new/index';
import { BoardShowComponent } from './board/board-show.component';
import { BoardNewComponent } from './board/board-new/board-new.component';
import { WallComponent } from './wall/wall.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'proposals', component: ProposalListComponent },
  { path: 'proposals/new', component: ProposalNewComponent },
  { path: 'proposal/:id', component: ProposalShowComponent },
  { path: 'board/:id', component: BoardShowComponent },
  { path: 'boards/new', component: BoardNewComponent },
  { path: 'wall', component: WallComponent },
  { path: ':id/postclips', component: PostclipComponent },
  { path: 'postclip/new', component: PostclipNewComponent }

]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule{ }
