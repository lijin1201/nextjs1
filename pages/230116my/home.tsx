/* eslint-disable @next/next/no-html-link-for-pages */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTreeCity } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { faTents } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import React from 'react';
import './_app.tsx';
export default function App1() {
  return (
    <>
      <nav id="navbar">
        <div className="navbar__logo">
          <a href="home">DongGyu여행</a>
        </div>
        <ul className="navbar__menu">
          <li className="navbar__menu__item">
            <a href="/research/research">검색</a>
          </li>
          <li className="navbar__menu__item">
            <a href="user">명단</a>
          </li>
          <li className="navbar__menu__item">
            <a href="user/홍길동">홍길동</a>
          </li>
        </ul>
      </nav>
      <section id="home">
        <h1 className="home__title">
          안녕하세요 <br />
          DongGyu여행입니다.
        </h1>
        <h2 className="home__description">재미있는 여행하세요~</h2>
        <button className="home__contact">
          <a href="/research/research">여행 검색</a>
        </button>
      </section>

      <section id="about" className="section section__container">
        <h1>여행 카테고리</h1>

        <div className="about__majors">
          <div className="major">
            <div className="major__icon"><a href="/category/traditionalHouse"><i><FontAwesomeIcon icon={faHouse} /></i></a></div>
            <div className="major_title">한옥</div>
          </div>
          <div className="major">
            <div className="major__icon"><a href=""><i><FontAwesomeIcon icon={faHotel} /></i></a></div>
            <div className="major_title">호텔</div>
          </div>
          <div className="major">
            <div className="major__icon"><a href=""><i><FontAwesomeIcon icon={faTreeCity} /></i></a></div>
            <div className="major_title">숲속</div>
          </div>
          <div className="major">
            <div className="major__icon"><a href=""><i><FontAwesomeIcon icon={faTents} /></i></a></div>
            <div className="major_title">펜션</div>
          </div>
        </div>
      </section>
    </>
  );
}
