import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [stateApp, setStateApp] = useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': stateApp.fontFamilyOption.value,
					'--font-size': stateApp.fontSizeOption.value,
					'--font-color': stateApp.fontColor.value,
					'--container-width': stateApp.contentWidth.value,
					'--bg-color': stateApp.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm articleState={stateApp} setArticleState={setStateApp}/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
