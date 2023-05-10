import React from "react";

export default function CatInfoCard(props: any) {
  return (
    <>
      <div key={props.cat.id} className="shadow-md bg-white p-4 rounded-lg">
        <div className="delete-icon-container">
          <i className="fa-solid fa-xmark text-gray-300 hover:text-red-500 cursor-pointer text-[30px] mb-3"></i>
        </div>
        <img
          className="rounded-sm "
          src={props.cat.img_url}
          alt={props.cat.img_url}
        />
        <div className="cat-info">
          <p>
            <article>
              <strong>Name : </strong>
              {props.cat.name}
            </article>
            <article>
              <strong>Age : </strong>
              {props.cat.age}
            </article>
            <article>
              <strong>Breed : </strong>
              {props.cat.breed}
            </article>
            <article>
              <strong>Gender : </strong>
              {props.cat.gender}
            </article>
            <article>
              <strong>Is it available? : </strong>
              {props.cat.is_available ? <>Yes</> : <>No</>}
            </article>
            <article>
              <strong>Description : </strong>
              <>{props.cat.description}</>
            </article>
            <div className=""></div>
          </p>
        </div>
      </div>
    </>
  );
}
