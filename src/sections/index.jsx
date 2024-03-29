import { useState } from 'react';
// @mui
import { Grid } from '@mui/material';
// components
import { DroppableProvider } from '../components/draggable-list';
// sections
import MainList from './main-list';
import SecondList from './second-list';
import { tableDatas } from '../_mock';

// ----------------------------------------------------------------------

export default function MainSection() {
  const [datas, setDatas] = useState(tableDatas);

  // console.log(datas);

  return (
    <DroppableProvider datas={datas} onChangeData={setDatas}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <MainList />
        </Grid>
        <Grid item xs={12} md={4}>
          <SecondList />
        </Grid>
      </Grid>
    </DroppableProvider>
  );
}
