import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <NotFound.js />', () => {
  test('se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading', { level: 2, name: /page requested not found/i });
    expect(notFoundText).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const imageNotFound = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(imageNotFound.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imageNotFound).toBeInTheDocument();
  });
});
