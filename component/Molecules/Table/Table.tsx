import {
  Flex,
  Spinner,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { ReactElement, ReactNode, createElement, FC } from "react";
import s from "shortid";

interface TableProps<TableData> {
  columnHeaders: { name: string; label: string }[];
  data: TableData[];
  onTitleClick: (id: string, name: string) => ReactNode;
  DropdownStatus?: (
    id: string,
    label: string,
    name: string,
    rowData?: TableData
  ) => ReactNode;
  actionButtons: (id: string, rowData: TableData) => ReactNode;
  loading: boolean;
  columnsRender?: {
    [name: string]: FC<
      {
        name: string;
        label: string;
      } & TableData
    >;
  };
}

const Table = <TableData,>({
  data,
  onTitleClick,
  DropdownStatus = () => ({}),
  actionButtons,
  columnHeaders,
  loading,
  columnsRender = {},
}: TableProps<TableData>) => {
  const cellData = (
    name: string | number,
    label: string,
    id: string,
    rowData: TableData
  ): ReactElement => {
    let data: string | number | ReactNode = "";
    switch (label) {
      case "TITLE":
        data = onTitleClick?.(id, name as string);
        break;
      case "STATUS":
        data = DropdownStatus(id, label, name as string);
        break;
      default:
        data = name;
        break;
    }
    return <Td key={s.generate()}>{data}</Td>;
  };

  const tableBody = (): ReactElement[] => {
    return data.map((row) => {
      const currentRow = new Map(Object.entries(row));
      return (
        <Tr key={currentRow.get("id")}>
          {columnHeaders.map(({ name, label }) => {
            if (columnsRender?.[name]) {
              const props = {
                name,
                label,
                ...row,
              };
              return (
                <Td key={name}>{createElement(columnsRender[name], props)}</Td>
              );
            }
            return cellData(
              currentRow.get(name),
              label,
              currentRow.get("id"),
              row
            );
          })}
          {actionButtons !== null && actionButtons !== undefined && (
            <Td>{actionButtons(currentRow.get("id"), row)}</Td>
          )}
        </Tr>
      );
    });
  };

  return (
    <ChakraTable variant="simple" colorScheme="facebook">
      <Thead>
        <Tr>
          {columnHeaders.map(({ label }, index) => {
            return <Th key={index}>{label}</Th>;
          })}
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {loading && (
          <Tr>
            <Td colSpan={columnHeaders.length}>
              <Flex align="center" justify="center" width="100%" minH="30vh">
                <Spinner />
              </Flex>
            </Td>
          </Tr>
        )}

        {!loading && data.length > 0 && tableBody()}
      </Tbody>
    </ChakraTable>
  );
};
export default Table;
