import { useEffect, useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { api } from '@/services/api';
import { HomePageI } from '@/types';
import Loader from '@/components/ui/loader/Loader';
import styles from './Home.module.scss';
import MainBanner from '@/components/home-page/main-banner/MainBanner';
import InfoSection from '@/components/home-page/info-section/InfoSection';
import HowItWork from '@/components/home-page/how-it-work/HowItWork';
import Map from '@/components/home-page/map/Map';
import Example from '@/components/home-page/example/Example';
import Address from '@/components/home-page/address/Address';

export default function Home() {
  const [data, setData] = useState<HomePageI>();
  const [fetchData, isLoading, error] = useFetch(() => api.get<HomePageI>('/main'));

  const loadHomePageData = async () => {
    const result = await fetchData();
    if (result) setData(result);
  };

  useEffect(() => {
    loadHomePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.home}>
      {isLoading && <Loader />}

      {error && <p className={styles.error}>{error.message}</p>}

      {!isLoading && !error && data && (
        <>
          <MainBanner
            title={data.banner.title}
            subtitle={data.banner.subtitle}
            image={data.banner.image}
            buttonText={data.banner.buttonText}
            buttonLink={data.banner.buttonLink}
          />
          <InfoSection program={data.infoSection} />
          <HowItWork title={data.howItWorks.title} steps={data.howItWorks.steps} />
          <Example
            title={data.example.title}
            description={data.example.description}
            stats={data.example.stats}
            images={data.example.images}
            priceLabel={data.example.priceLabel}
            price={data.example.price}
          />
          <Address
            title={data.contacts.title}
            address={data.contacts.address}
            city={data.contacts.city}
          />
          {data.contacts.mapCoords && (
            <Map lat={data.contacts.mapCoords.lat} lng={data.contacts.mapCoords.lng} />
          )}
        </>
      )}
    </div>
  );
}
