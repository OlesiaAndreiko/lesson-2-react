import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    search: '',
    gallary: [],
  };

  onSubmit = query => {
    console.log(query);
    this.setState({ search: query });
  };

  componentDidUpdate(_, prevState) {
    const {search} = this.state
    if (prevState.search !== search) {
      ImageService.getImages().then(data => {
        console.log(data);
        this.setState(prevState => ({
          gallary: [...prevState.gallary, ...data.photos],
        }));
      });
    }
  }

  render() {
    return (
      <>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        <SearchForm onSubmit={this.onSubmit} />
      </>
    );
  }

  //   У відповіді від API приходить масив об'єктів, в яких тобі цікаві лише наступні
  // властивості.

  // - `id` - унікальний ідентифікатор
  // - `avg_color` - колір фотографії,
  // - `alt` - опис фото,
  // - `src` - об'єкт з розмірами картинок, нам цікавий розмір `large`
}
