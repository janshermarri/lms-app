import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { ChangeEvent, useState } from 'react';
import PageHeader from '@/content/Dashboards/Tasks/PageHeader';
import Footer from '@/components/Footer';
import {
  Grid,
  Divider,
  Container,
  Card,
  Box,
  useTheme,
  styled
} from '@mui/material';
import PageTitleWrapper from '@/components/PageTitleWrapper';

import TasksAnalytics from '@/content/Dashboards/Tasks/TasksAnalytics';
import Performance from '@/content/Dashboards/Tasks/Performance';
import { useRouter } from 'next/router';
import { isUserValid } from 'src/api/api';
import { useEffect } from 'react';


function DashboardTasks() {
  const theme = useTheme();

  const [currentTab, setCurrentTab] = useState<string>('analytics');

  const router = useRouter();

  const tabs = [
    { value: 'analytics', label: 'Analytics Overview' },
    { value: 'taskSearch', label: 'Task Search' }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };



  useEffect(() => {
    if (!isUserValid()) {
      router.push('/login');
    }  
}, []);


 
  return (
    <>
      <Head>
        <title>LMS Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Card variant="outlined">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={0}
          >
              <>
                <Grid item xs={12}>
                  <Divider />
                  <Box
                    p={4}
                    sx={{
                      background: `${theme.colors.alpha.black[5]}`
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6} md={8}>
                        <TasksAnalytics />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Performance />
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                </Grid>
              </>
          </Grid>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
