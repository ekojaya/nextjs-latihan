import {
  Box,
  Heading,
  Flex,
  Button,
  IconButton,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  ButtonGroup,
  Stack,
} from "@chakra-ui/react";
import Panel from "component/Molecules/Panel";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Form, Formik } from "formik";
import TextInput from "component/Atoms/TextInput";
import { isEmpty } from "lodash";
import { isNil } from "lodash";
import { object } from "yup";
import {
  requiredString,
  requiredNumber,
  decimalNumber,
} from "@/constants/validationSchema";
import Select from "component/Atoms/Select";
import { days, TypeQTYSelect } from "constants/dataDropdown";
import { actions } from "@/states/SayurMayur/slice";
import { useAppDispatch } from "hooks";
import { TSayurMyurPayload } from "@/types/sayurMayur";
import { unwrapResult } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/states/store";

const validationSchema = object({
  productName: requiredString,
  typeQTY: requiredString,
  QTY: decimalNumber,
  priceBBS: requiredNumber,
  pricePWT: requiredNumber,
  // day: requiredString,
});
const initialValues: TSayurMyurPayload = {
  productName: "",
  typeQTY: "",
  QTY: 0,
  pricePWT: 0,
  priceBBS: 0,
};

const SayurMayur = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { slug } = router.query;
  const [titleName, setTitleName] = useState("New");
  const [isSubmitting, setSubmitting] = useState(false);

  const { dataDetail, loading } = useSelector(
    (state: RootState) => ({
      dataDetail: state.sayurMayur.dataDetail,
      loading: state.sayurMayur.loading,
    }),
    shallowEqual
  );

  // const [initialValues, setInitialValues] = useState(DummyInitialValue);
  useEffect(() => {
    if (slug !== "new" && slug !== undefined) {
      setTitleName("Edit");
      dispatch(actions.getSyaurMayurById(slug as string));
    }
  }, [slug, dispatch]);
  return (
    <Box minHeight="100vh" width="100%" padding="2rem 3rem" bg="grey.100">
      <Stack direction="row" align="flex-start" width="full">
        <Heading as="h2" size="xl" fontWeight="extrabold" width="90%">
          {titleName} Sayur Mayur
        </Heading>
        <Link href={`/sayur-mayur`} passHref>
          <Button marginLeft="1rem" width="10%" bgColor="green" color="white">
            Back
          </Button>
        </Link>
      </Stack>

      <Panel label="">
        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={slug === "new" ? initialValues : dataDetail}
          onSubmit={(values) => {
            setSubmitting(true);
            // console.log("values", values);
            if (slug === "new") {
              dispatch(actions.addSayurMayur(values))
                .then(unwrapResult)
                .then(() => router.push("/sayur-mayur"));
            } else {
              dispatch(
                actions.updateSayurMayur({
                  id: slug as string,
                  payload: values,
                })
              )
                .then(unwrapResult)
                .then(() => router.push("/sayur-mayur"));
            }

            setSubmitting(false);
          }}
        >
          {({ resetForm }) => (
            <Form style={{ width: "100%" }}>
              <Stack direction="column" align="flex-start" spacing="10">
                <TextInput
                  id="productName"
                  name="productName"
                  label="Product Name"
                  placeholder="Product Name"
                />
                <TextInput id="QTY" name="QTY" label="QTY" placeholder="QTY" />

                <Select
                  id="typeQTY"
                  name="typeQTY"
                  label="Type QTY"
                  placeholder="Type QTY"
                  data={TypeQTYSelect.map((item) => ({
                    label: item.label,
                    value: item.value,
                  }))}
                  bgColor="white"
                />
                <TextInput
                  id="priceBBS"
                  name="priceBBS"
                  label="price in BBS"
                  placeholder="price in BBS"
                  type="number"
                />
                <TextInput
                  id="pricePWT"
                  name="pricePWT"
                  label="price in PWT"
                  placeholder="price in PWT"
                  type="number"
                />
                {/* <Select
                  id="day"
                  name="day"
                  label="day"
                  placeholder="day"
                  data={days.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))}
                  bgColor="white"
                /> */}
              </Stack>
              <ButtonGroup mt="8">
                <Button
                  bgColor="green"
                  color="white"
                  isLoading={isSubmitting || loading}
                  type="submit"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => resetForm()}
                  variant="outline"
                  isLoading={isSubmitting || loading}
                  color="gray.500"
                  bg="white"
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Panel>
    </Box>
  );
};

export default SayurMayur;
