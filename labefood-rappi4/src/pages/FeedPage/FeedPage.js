import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProtectedPage from "../../hooks/useProtected";
import useRequestData from "../../hooks/useRequestData";
import goToPage from "../../routes/coordinator";
import { BASE_URL } from "./../../constants/Url/url";
import {
  DivContainer,
  Img,
  ContainerLogo,
  DivDetalhe,
  H3,
  ContainerRest,
  DivCarousel,
  ButtonOnActive,
  DivHamburguer,
  DivRestaurantesMapeados,
  DivPedidoFinal,
  ImageClock
} from "./style";
import {
  ChakraProvider,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./Example.css";
import useProtectedAdress from "../../hooks/useProtectedAdress"
import NavegationFeed from "../../components/Footer/navegationFeed"
import getPlaceOrder from './../../hooks/useGetPlaceOrder'
import clock from './../../assets/images/clock.svg'

function FeedPage() {
  const res = useRequestData([], `${BASE_URL}/restaurants`);
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  useProtectedPage();
  const [filtredRestaurant, setFiltredRestaurant] = useState("");
  useProtectedAdress()
 const data = getPlaceOrder()


  const cardPedidoFinal = () => {
    return (
      <DivPedidoFinal>
        <div><ImageClock src={clock}></ImageClock></div>
       <div>
        <p>Pedido em andamento</p>
        <h2><strong>{data.order.restaurantName}</strong></h2>
        <strong>SUBTOTAL R${data.order.totalPrice},00</strong>
        </div> 
        </DivPedidoFinal>
    )
  }



  const cardRestaurant = res.restaurants
    ?.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(search.toLowerCase());
    })
    .filter((restaurant) => {
      return restaurant.category === filtredRestaurant || filtredRestaurant === ""

    })
    .map((restaurant) => {
      return (
        <ContainerRest key={restaurant.id} onClick={() => goToPage(navigate, `res/${restaurant.id}`)}>
          <ContainerLogo>
            <Img src={restaurant.logoUrl} alt="logo" />
          </ContainerLogo>
          <H3><b>{restaurant.name}</b></H3>
          <DivDetalhe>
            <p>
              {restaurant.deliveryTime} - {restaurant.deliveryTime + 10} min
            </p>
            <p>Frete: R${restaurant.shipping},00</p>
          </DivDetalhe>
        </ContainerRest>
      );
    });

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (e) => {
    if(e.target.innerText === 'Burguer'){
      setFiltredRestaurant('Hamburguer')
    }else{

      setFiltredRestaurant(e.target.innerText);
    }
  };

  return (
    <ChakraProvider>
      <DivContainer>
        <Stack spacing={4}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BsSearch color="gray.300" />}
              marginTop="20px"
            />
            <Input
              htmlSize={32}
              marginTop="20px"
              type={"text"}
              onChange={onChangeSearch}
              value={search}
              placeholder={"Restaurante"}
            />
          </InputGroup>
        </Stack>

        <div className="carousel__container">
          <CarouselProvider
            naturalSlideWidth={110}
            naturalSlideHeight={40}
            totalSlides={8}
            visibleSlides={1}
            currentSlide={2}
          >
            <Slider onClick={(e) => handleClick(e)}>
              <Slide index={0}><ButtonOnActive>Árabe</ButtonOnActive></Slide>
              <Slide index={1}><ButtonOnActive>Asiática</ButtonOnActive></Slide>
              <Slide index={2}><ButtonOnActive>Baiana</ButtonOnActive></Slide>
              <Slide index={3}><ButtonOnActive>Carnes</ButtonOnActive></Slide>
              <Slide index={4}><ButtonOnActive>Burguer</ButtonOnActive></Slide>
              <Slide index={5}><ButtonOnActive>Italiana</ButtonOnActive></Slide>
              <Slide index={6}><ButtonOnActive>Mexicana</ButtonOnActive></Slide>
              <Slide index={7}><ButtonOnActive>Sorvetes</ButtonOnActive></Slide>
            </Slider>
          </CarouselProvider>
        </div>

        {cardRestaurant?.length !== 0 ? (
         <DivRestaurantesMapeados>{cardRestaurant}</DivRestaurantesMapeados> 
        ) : (
          <p>Restaurante não encontrado!</p>
        )}
      </DivContainer>

      {data.order ? 
      (cardPedidoFinal())
      :
      null}


      <NavegationFeed page={'feed'} />
    </ChakraProvider>
  );
}

export default FeedPage;
