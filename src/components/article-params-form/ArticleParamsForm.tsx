import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text, } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { fontFamilyOptions, OptionType, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx';


interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
  }

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [buttonIsOpen, setButtonIsOpen] = useState(false);
	const [formIsOpen, setFormIsOpen] = useState(false);
	const [selectedFontFamily, setSelectedFontFamily] = useState(props.articleState.fontFamilyOption);
	const [selectedFontColor, setSelectedFontColor] = useState(props.articleState.fontColor);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(props.articleState.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState(props.articleState.contentWidth)
	const [selectedFontSize, setSelectedFontSize] = useState(props.articleState.fontSizeOption);
	const defaultSettings = useRef<ArticleStateType>(props.articleState);

	const handleFontFamilyChange = (newFontFamily: OptionType) => {
		setSelectedFontFamily(newFontFamily);
	};

	const handleFontColorChange = (newFontColor: OptionType) => {
		setSelectedFontColor(newFontColor);
	};

	const handleBackgroundColorChange = (newBackColor: OptionType) => {
		setSelectedBackgroundColor(newBackColor);
	};

	const handleContentWidthChange = (newContentWidth: OptionType) => {
		setSelectedContentWidth(newContentWidth);
	};

	const handleFontSizeChange = (newFontSize: OptionType) => {
		setSelectedFontSize(newFontSize);
	};
	
	const resetSettings = () => {
		setSelectedFontFamily(defaultSettings.current.fontFamilyOption);
		setSelectedFontColor(defaultSettings.current.fontColor);
		setSelectedBackgroundColor(defaultSettings.current.backgroundColor);
		setSelectedContentWidth(defaultSettings.current.contentWidth);
		setSelectedFontSize(defaultSettings.current.fontSizeOption);
		props.setArticleState(defaultSettings.current);
		setFormIsOpen(false);
		setButtonIsOpen(false);
	}

	const changeContent = (event: React.FormEvent) => {
		event.preventDefault();
		props.setArticleState(
			{	
				fontFamilyOption: selectedFontFamily,
				fontColor: selectedFontColor,
				backgroundColor: selectedBackgroundColor,
				contentWidth: selectedContentWidth,
				fontSizeOption: selectedFontSize,
		})
		setFormIsOpen(false);
		setButtonIsOpen(false);
	}

	type SpacerProps = {
		height: string;
	};
	
	const Spacer: React.FC<SpacerProps> = ({ height }) => {
		return <div style={{ height: height }}></div>;
	};

	return (
		<>
			<ArrowButton isOpen={buttonIsOpen} onClick={() => {
				buttonIsOpen ? setButtonIsOpen(false) : setButtonIsOpen(true);
				formIsOpen ? setFormIsOpen(false) : setFormIsOpen(true);
			}} />
			<aside className={clsx(styles.container, {[styles.container_open]:formIsOpen})}>
				<form className={styles.form} onSubmit={changeContent}>
					<Text size={31} weight={800} uppercase={true}>Задайте параметры</Text>
					<Spacer height='50px'></Spacer>
					<Select selected={selectedFontFamily} options={fontFamilyOptions} onChange={handleFontFamilyChange} title='Шрифт'></Select>
					<Spacer height='50px'></Spacer>
					<RadioGroup name='fontSize' title='Размер шрифта' options={fontSizeOptions} selected={selectedFontSize} onChange={handleFontSizeChange}></RadioGroup>
					<Spacer height='50px'></Spacer>
					<Select selected={selectedFontColor} options={fontColors} onChange={handleFontColorChange} title='Цвет шрифта'></Select>
					<Spacer height='50px'></Spacer>
					<Separator></Separator>
					<Spacer height='50px'></Spacer>
					<Select selected={selectedBackgroundColor} options={backgroundColors} onChange={handleBackgroundColorChange} title='Цвет фона'></Select>
					<Spacer height='50px'></Spacer>
					<Select selected={selectedContentWidth} options={contentWidthArr} onChange={handleContentWidthChange} title='Ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={resetSettings}/>
						<Button title='Применить' htmlType='submit' type='apply'/>
					</div>
				</form>
			</aside>
		</>
	);
};
