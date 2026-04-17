import { Routes } from "@angular/router";
import { ArticleList } from "./pages/article-list/article-list";
import { Article } from "./pages/article/article";

const routes: Routes = [
    {
        path: '',
        component: ArticleList,
    },
    {
        path: ':id',
        component: Article
    }
]

export default routes