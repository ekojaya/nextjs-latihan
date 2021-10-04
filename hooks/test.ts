import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import firebase from "@/connections/firebase";
import { isNil } from "lodash";
import { TData } from "@/types/test";
// import { DummyShopDiscover } from "@/constants/dummyShopDiscover";
import { useToast } from "@chakra-ui/react";

const db = firebase.firestore();
export const useTest = (docId: string) => {
  const toast = useToast();

  const [value, loading, error] = useDocument(db.doc(`data/${docId}`), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const NewData = !isNil(value)
    ? (Object.assign({ id: value.id }, value.data()) as TData)
    : {};

  if (error) {
    toast({
      title: error.message,
      position: "bottom",
      isClosable: true,
      status: "error",
    });
  }

  return {
    isLoading: loading,
    response: NewData,
  };
};
