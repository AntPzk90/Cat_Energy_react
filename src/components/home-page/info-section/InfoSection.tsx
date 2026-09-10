import { Link } from 'react-router-dom';
import styles from './InfoSection.module.scss';
import { InfoSectionItemI } from '@/types';

interface PropsI {
  program: InfoSectionItemI[];
}

export default function InfoSection({ program }: PropsI) {
  return (
    <>
      <section className={styles['info-section']}>
        <div className={styles['info-section__wrapper']}>
          <ul className={`${styles['info-section__list']} ${styles['program']}`}>
            {program.map((programItem: InfoSectionItemI) => (
              <li className={styles['program__item']} key={programItem.id}>
                <div className={styles['program__image-holder']}>
                  <img
                    src={programItem.icon}
                    width={programItem.icon.includes('muscule') ? 68 : 36}
                    height={50}
                    className={styles['program__image']}
                  />
                </div>
                <h2 className={styles['program__title']}>{programItem.title}</h2>
                <p className={styles['program__description']}>{programItem.description}</p>
                <div className={styles['program__link-holder']}>
                  <Link to={programItem.buttonLink} className={styles['program__link']}>
                    {programItem.buttonText}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
