import { Box, Heading, Flex, Button, IconButton, Text } from "@chakra-ui/react";
import Panel from "component/Molecules/Panel";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Table from "component/Molecules/Table/Table";
import { IoMdTrash } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { useRouter } from "next/router";
import { TSayurMyur } from "types/sayurMayur";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/states/store";
import { useAppDispatch } from "hooks";
import { actions } from "@/states/SayurMayur/slice";
import ConfirmDialog from "component/Atoms/ConfirmDialog";

const COLUMN_HEADERS = [
  { name: "productName", label: "Product Name" },
  { name: "QTY", label: "QTY" },
  { name: "typeQTY", label: "Type QTY" },
  { name: "priceBBS", label: "price in BBS" },
  { name: "pricePWT", label: "price in PWT" },
];
const SayurMayur = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState({
    openDeleteDialog: false,
    id: "",
  });
  const { list, loading } = useSelector(
    (state: RootState) => ({
      list: state.sayurMayur.list,
      loading: state.sayurMayur.loading,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(actions.getListSayurMayur());
  }, [dispatch]);
  console.log("list", list);
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
            loading={loading}
            columnHeaders={COLUMN_HEADERS}
            data={list}
            onTitleClick={(id: string, name: string) => (
              <Text fontWeight="bold" cursor="pointer">
                {name}
              </Text>
            )}
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
                  onClick={() =>
                    setOpenDeleteDialog({
                      id: id,
                      openDeleteDialog: true,
                    })
                  }
                />
              </Flex>
            )}
          />
        </Panel>
      </Panel>
      <ConfirmDialog
        isOpen={isOpenDeleteDialog.openDeleteDialog}
        onClose={() =>
          setOpenDeleteDialog({
            id: "",
            openDeleteDialog: false,
          })
        }
        onConfirmAction={async () => {
          await dispatch(actions.removeSayurMayurById(isOpenDeleteDialog.id));
          await dispatch(actions.getListSayurMayur());
        }}
        header="Delete a Sayur Mayur"
        body="Are you sure? You cant undo this action afterwards."
        type="delete"
      />
    </Box>
  );
};

export default SayurMayur;
