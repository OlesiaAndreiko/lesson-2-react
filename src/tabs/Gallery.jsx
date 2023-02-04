import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    search: '',
    gallary: [],
    page: 1,
    showBtn: false,
  };

  onSubmit = query => {
    console.log(query);
    this.setState({ gallary: [], page: 1, showBtn: false, search: query });
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      ImageService.getImages(search, page).then(data => {
        if (!data.photos.length) {
          toast.error("Wow so easy!")
          return
        }
        console.log(data);
        toast.success(`Wow-wow find ${data.total_results} images!`)
        this.setState(prevState => ({
          gallary: [...prevState.gallary, ...data.photos],
          showBtn: page < Math.ceil(data.total_results / 15),
        }));
      });
    }
  }

  addImgPage = () => {
    this.setState(preState => ({ page: preState.page + 1 }));
  };

  render() {
    const { gallary, showBtn } = this.state;
    return (
      <>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        <SearchForm onSubmit={this.onSubmit} />
        {gallary.length > 0 && (
          <Grid>
            {gallary.map(({ id, avg_color, src, alt }) => {
              return (
                <GridItem key={id}>
                  <CardItem color={avg_color}>
                    <img src={src.large} alt={alt} />
                  </CardItem>
                </GridItem>
              );
            })}
          </Grid>
        )}
        {showBtn && (
          <Button type="button" onClick={this.addImgPage}>
            Load more
          </Button>
        )}
        <ToastContainer />
      </>
    );
  }

  //   У відповіді від API приходить масив об'єктів, в яких тобі цікаві лише наступні
  // властивості.

  // - `id` - унікальний ідентифікатор`
  // - `avg_color` - колір фотографії,
  // - `alt` - опис фото,
  // - `src` - об'єкт з розмірами картинок, нам цікавий розмір `large`
}
