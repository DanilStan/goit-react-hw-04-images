import { useState, useEffect } from 'react';
import { Loader } from '../Loader/Loader';
import { getImage } from 'data/api';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const Status = {
  init: 'init',
  loading: 'loading',
  ok: 'success',
  error: 'error',
};

export const ImageGallery = ({ value, onClick }) => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.init);

  useEffect(() => {
    setStatus(Status.loading);

    async function getData() {
      try {
        const data = await getImage(value);
        setImages(data);
        setStatus(Status.ok);
      } catch {
        setStatus(Status.error);
      }
    }
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    async function getData() {
      const newData = await getImage(value);
      setImages(newData);
    }
    getData();
  }, [value]);

  useEffect(() => {
    if (page > 1) {
      async function getData() {
        const newPage = await getImage(value, page);
        setImages(prevImages => [...prevImages, ...newPage]);
      }
      getData();
    }
    // eslint-disable-next-line
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {status === Status.error && <p>Ошибка</p>}

      {(status === Status.loading || status === Status.init) && <Loader />}

      {status === Status.ok && (
        <ul className={css.ImageGallery}>
          {images?.map(item => {
            return (
              <ImageGalleryItem
                key={item.webformatURL}
                url={item.webformatURL}
                onClick={onClick}
                bigImage={item.largeImageURL}
              />
            );
          })}
        </ul>
      )}
      {images.length >= 12 && <Button onClick={handleLoadMore} />}
    </>
  );
};

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
