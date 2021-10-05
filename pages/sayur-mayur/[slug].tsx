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
import Table from "component/Molecules/Table/Table";
import { IoMdTrash } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { useRouter } from "next/router";

import { BsChevronRight } from "react-icons/bs";
import { Form, Formik } from "formik";
import TextInput from "component/Atoms/TextInput";
import { isEmpty } from "lodash";
import { isNil } from "lodash";
import { object } from "yup";
import { requiredString, requiredNumber } from "@/constants/validationSchema";
import Select from "component/Atoms/Select";

const validationSchema = object({
  productName: requiredString,
  typeQTY: requiredString,
  QTY: requiredString,
  price: requiredNumber,
});
const DummyInitialValue = {
  productName: "",
  typeQTY: "",
  QTY: "",
  price: 0,
};
const TypeQTYSelect = [
  {
    label: "Kg",
    value: "Kg",
  },
  {
    label: "Pcs",
    value: "Pcs",
  },
  {
    label: "Pack",
    value: "Pack",
  },
  {
    label: "Ikat",
    value: "Ikat",
  },
  {
    label: "Biji",
    value: "Biji",
  },
];
const SayurMayur = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [titleName, setTitleName] = useState("New");
  const [isSubmitting, setSubmitting] = useState(false);
  const [initialValues, setInitialValues] = useState(DummyInitialValue);

  useEffect(() => {
    if (slug !== "new" && slug !== undefined) {
      setTitleName("Edit");
    }
  }, [slug]);
  return (
    <Box minHeight="100vh" width="100%" padding="2rem 3rem" bg="grey.100">
      <Heading as="h2" size="xl" fontWeight="extrabold">
        {titleName} Sayur Mayur
      </Heading>
      <Panel label="">
        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => {
            // setSubmitting(true);
            // fetchMutationFeedback({
            //   variables: {
            //     setFeedbackInput: {
            //       url: values.url,
            //     },
            //   },
            // });
            console.log("values", values);
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
                  id="price"
                  name="price"
                  label="price"
                  placeholder="price"
                  type="number"
                />
              </Stack>
              <ButtonGroup mt="8">
                <Button
                  bgColor="green"
                  color="white"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => resetForm()}
                  variant="outline"
                  isLoading={isSubmitting}
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
