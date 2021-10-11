import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box, Button, Text } from "@chakra-ui/react";
import { useTest } from "@/hooks/test";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const docId = "rtRTv07Cr5Lw6SfPKBHy";
  const { response } = useTest(docId);
  console.log("response", response);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Latihan</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Text>ini 1</Text>
        <Button
          bgColor="green"
          color="white"
          onClick={() => router.push("/sayur-mayur")}
        >
          sayut Mayur
        </Button>
      </Box>
    </div>
  );
};

export default Home;
