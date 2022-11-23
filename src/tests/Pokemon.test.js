import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Testando o componente <Pokemon.js />', () => {
  test('se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const firstPokemonName = screen.getByTestId('pokemon-name');
    expect(firstPokemonName.textContent).toBe('Pikachu');
    expect(firstPokemonName).toBeInTheDocument();

    const firstPokemonType = screen.getByTestId('pokemon-type');
    expect(firstPokemonType.textContent).toBe('Electric');
    expect(firstPokemonType).toBeInTheDocument();

    const firstPokemonAverageWeight = screen.getByTestId('pokemon-weight');
    expect(firstPokemonAverageWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(firstPokemonAverageWeight).toBeInTheDocument();

    const firstPokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(firstPokemonImage.src).toBe(data[0].image);
    expect(firstPokemonImage.alt).toBe('Pikachu sprite');
    expect(firstPokemonImage).toBeInTheDocument();
  });
  test('se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);

    const firstPokemonLink = screen.getByRole('link', { name: /more details/i });
    expect(firstPokemonLink.href).toBe('http://localhost/pokemon/25');

    const firstPokemonIdLink = (+firstPokemonLink.href.split('/')[firstPokemonLink.href.split('/').length - 1]);
    expect(firstPokemonIdLink).toEqual(data[0].id);
  });
  test('se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const firstPokemonLink = screen.getByRole('link', { name: /more details/i });
    expect(firstPokemonLink).toBeInTheDocument();
    userEvent.click(firstPokemonLink);

    expect(history.location.pathname).toBe(`/pokemon/${data[0].id}`);
  });
  test('se existe um ícone de estrela nos Pokémon favoritado', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    userEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));

    const imageFavorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(imageFavorite).toBeInTheDocument();
    expect(imageFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(imageFavorite.alt).toBe('Pikachu is marked as favorite');
  });
});
