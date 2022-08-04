import { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import SidebarLayout from "@/layouts/SidebarLayout";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageTitle from "@/components/PageTitle";
import CoreService from "@/service/core";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      setUsers(await CoreService.users.get());
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Usuários</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Usuários"
        />
      </PageTitleWrapper>
      <Box
        sx={{
          padding: 2
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Função</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default UsersPage;

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
