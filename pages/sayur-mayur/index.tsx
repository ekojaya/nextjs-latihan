import { Box, Heading, Flex, Button, IconButton, Text } from "@chakra-ui/react";
import Panel from "component/Molecules/Panel";
import React from "react";
import Link from "next/link";
import Table from "component/Molecules/Table/Table";
import { IoMdTrash } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { useRouter } from "next/router";

interface TSayurMyur {
  id: string;
  productName: string;
  typeQTY: string;
  QTY: string;
  price: number;
}

const COLUMN_HEADERS = [
  { name: "productName", label: "TITLE" },
  { name: "QTY", label: "QTY" },
  { name: "typeQTY", label: "Type QTY" },
  { name: "price", label: "Price" },
];
const DataDummy = [
  {
    id: "1",
    productName: "welok",
    typeQTY: "kg",
    QTY: "1",
    price: 1000,
  },
];
const SayurMayur = () => {
  const router = useRouter();
  return (
    <Box minHeight="100vh" width="100%" padding="2rem 3rem" bg="grey.100">
      <Heading as="h2" size="xl" fontWeight="extrabold">
        Sayur Mayur
      </Heading>
      <Panel label="">
        <Flex justifyContent="space-evenly" width="100%">
          <Link href={`/sayur-mayur/new`} passHref>
            <Button
              marginLeft="1rem"
              width="full"
              bgColor="green"
              color="white"
            >
              Add
            </Button>
          </Link>
        </Flex>
        <Panel label="">
          <Table<TSayurMyur>
            loading={false}
            columnHeaders={COLUMN_HEADERS}
            data={DataDummy}
            onTitleClick={(id: string, name: string) => <Text>{name}</Text>}
            actionButtons={(id: string, rowData: TSayurMyur) => (
              <Flex justifyContent="flex-end">
                <IconButton
                  aria-label="Edit image"
                  icon={<MdOutlineModeEdit />}
                  variant="ghost"
                  bgColor="white"
                  size="sm"
                  type="button"
                  fontSize="1.4rem"
                  onClick={() => router.push(`/sayur-mayur/${id}`)}
                />
                <IconButton
                  aria-label="Remove image"
                  icon={<IoMdTrash />}
                  variant="ghost"
                  bgColor="white"
                  size="sm"
                  type="button"
                  fontSize="1.4rem"
                  // onClick={() =>
                  //   setOpenDeleteDialog({
                  //     id: id,
                  //     openDeleteDialog: true,
                  //   })
                  // }
                />
              </Flex>
            )}
          />
        </Panel>
      </Panel>
    </Box>
  );
};

export default SayurMayur;
