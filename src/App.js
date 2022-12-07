import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import api from "./Services/api";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";
import Loader from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";
import OnError from "./Components/OnError/OnError";

const App = () => {
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [query, setQuery] = useState("");
	const [actualPage, setActualPage] = useState(1);
	const [lastPage, setLatPage] = useState(1);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalPhotoURL, setModalPhotoURL] = useState(null);
	const [modalAlt, setModalAlt] = useState(null);

	const updateQuery = ({ query }) => {
		setQuery(query);
	};

	const mapNewImages = (fetchedImages) => {
		const mapedImages = fetchedImages.map((image) => ({
			id: image.id,
			small: image.webformatURL,
			large: image.largeImageURL,
			alt: image.tags,
		}));
		return mapedImages;
	};

	const goToNextPage = () => {
		setActualPage(actualPage + 1);
	};

	const openModal = (e) => {
		setModalPhotoURL(e.target.dataset["source"]);
		setModalAlt(e.target.alt);
		setModalIsOpen(true);
	};

	const closeModal = (e) => {
		if (e.target.nodeName !== "IMG") {
			setModalIsOpen(false);
		}
	};

	const closeModalwithButton = (e) => {
		if (e.key === "Escape") {
			setModalIsOpen(false);
		}
	};

	const fetchWitchQuery = async () => {
		try {
			setIsLoading(true);
			const fetchedData = await api.fetchImageWithQuery(query, 1);
			const mapedImages = await mapNewImages(fetchedData.images);
			const lastPage = Math.ceil(fetchedData.total / 12);
			setActualPage(1);
			setImages([...mapedImages]);
			setLatPage(lastPage);
			window.scrollTo({ top: 0, behavior: "smooth" });
		} catch (error) {
			console.log("Error");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (query !== "") {
			fetchWitchQuery();
		}
	}, [query]);

	const fetchWithButton = async () => {
		try {
			setIsLoading(true);
			const fetchedData = await api.fetchImageWithQuery(query, actualPage);
			const mapedImages = await mapNewImages(fetchedData.images);
			const concatImages = images.concat(mapedImages);
			setImages([...concatImages]);
		} catch (error) {
			console.log("Error");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (actualPage !== 1) {
			fetchWithButton();
		}
	}, [actualPage]);

	return (
		<>
			{modalIsOpen && (
				<Modal
					src={modalPhotoURL}
					alt={modalAlt}
					closeHandler={closeModal}
					escHandler={closeModalwithButton}
				></Modal>
			)}
			<Searchbar onSubmit={updateQuery} />
			<ImageGallery images={images} page={actualPage} clickHanlder={openModal} />
			{actualPage !== lastPage && images.length > 0 && isLoading === false ? (
				<Button onClick={goToNextPage} />
			) : (
				""
			)}
			{isLoading && <Loader />}
			{images.length === 0 && query !== "" && isLoading === false && (
				<OnError>Nothing found! Try again</OnError>
			)}
		</>
	);
};

export default App;
