import React, {useMemo} from 'react';
import styled from 'styled-components';
import { 
    useTable, 
    usePagination, 
    useFilters, 
    Column,
    useGlobalFilter,
    Row,
} from 'react-table';
import { Import } from '@styled-icons/boxicons-regular/Import';
import { Add } from '@styled-icons/ionicons-sharp/Add';
import { ListProps } from '@Containers/List';
import { VendorsFilter, IFilterItems } from './VendorsFilter';
import { VendorsHeader } from './VendorsHeader';
import { INavigationItemProps } from './NavigationItem';
import { NavigationBar } from './NavigationBar';
import { DefaultFilter } from './DefaultFilter';
import { ReactTable } from '../ReactTable/ReactTable';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

const INITIAL_FIRST_PAGE = 0;
const INITIAL_PAGE_SIZE_FIVE = 5;

export interface IVendorsListProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
            filterItems: IFilterItems[];
            data: any[];
            columns: Column<any>[];
            navigationBarItems?: INavigationItemProps[];
            headerRightButtonText: string;
            headerText: string;
            filterHeader: React.ReactElement;
            onSelectRow: (original: any) => void;
            listProps: ListProps;
            tableHeight?: string;
            globalFilterMethod?: (rows: Row<object>[], theColumns: string[], filterValue: any) => Row<object>[];
            selectedNavLabel: string;
            groups: string[];
            onImportButtonClick: () => void;
            onAddButtonClick: () => void;
};

export const VendorsList: React.FC<IVendorsListProps> = ({
    data,
    columns,
    filterItems,
    navigationBarItems,
    headerRightButtonText,
    headerText,
    filterHeader,
    onSelectRow,
    listProps,
    tableHeight,
    globalFilterMethod,
    selectedNavLabel,
    onImportButtonClick,
    onAddButtonClick,
    ...props
}): React.ReactElement => {
    const defaultColumn = useMemo(()=>({ Filter: DefaultFilter}), [])
    const memoColumns = useMemo(()=> columns, [columns])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        preGlobalFilteredRows,
        filteredRows,
        setGlobalFilter,
        state: { globalFilter, pageIndex, pageSize }
    } = useTable(
        {
            columns: memoColumns,
            data,
            defaultColumn,
            initialState: { 
                pageIndex: INITIAL_FIRST_PAGE, 
                pageSize: INITIAL_PAGE_SIZE_FIVE
            },
            globalFilter: globalFilterMethod
        },
        useFilters, 
        useGlobalFilter,
        usePagination
    );

    return (
        <Wrapper {...props}>
            <ListWrapper>
                <VendorsFilter
                    headerGroups={headerGroups}
                    header={filterHeader}
                    filterItems={filterItems}
                    listProps={listProps}
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    setGlobalFilter={setGlobalFilter}
                    globalFilter={globalFilter}
                    headingProps={{ style: { padding: '20px 0 0 20px' }}}
                    buttonProps={{ style: { margin: '20px 0' } }}
                    collapsibleHeadingProps={{ style: { marginTop: '20px' } }}
                />
            </ListWrapper>
            <WrapperColumn columnWidth={listProps.columnWidth}>
                <SVendorsHeader 
                    headerText={headerText}
                    rightButtonText={headerRightButtonText}
                    leftButtonProps={{ icon: Import, onClick: onImportButtonClick, style: { margin: '0 20px' } }}
                    rightButtonProps={{ icon: Add, onClick: onAddButtonClick, primary: true }}
                />
                {navigationBarItems && (
                    <SNavigationBar
                        navigationItemProps={{ iconProps: { style: { marginRight: '5px' } },
                            style: { marginRight: '10px' } }}
                        navigationBarItems={navigationBarItems}
                        selectedNavLabel={selectedNavLabel}
                    />
                )}
                <ReactTable 
                    data={data}
                    columns={columns}
                    getTableProps={getTableProps}
                    getTableBodyProps={getTableBodyProps}
                    headerGroups={headerGroups}
                    page={page}
                    prepareRow={prepareRow}
                    pageCount={pageCount}
                    gotoPage={gotoPage}
                    nextPage={nextPage}
                    previousPage={previousPage}
                    setPageSize={setPageSize}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    filteredRows={filteredRows}
                    pageSelectOptions={[5, 10, 15, 20]}
                    tableHeaderProps={{ style: { margin: '10px' } }}
                    tableRowProps={{ style: { margin: '10px 0' } }}
                    tableProps={{style: {width: '100%'}}}
                    paginationProps={{ style: { marginTop: '10px' },
                        pageSelectorProps: { buttonProps: { style: { margin: '0 5px' } }, style: { margin: '10px 0' }, smallTextProps: {margin: '10px 0'} }, 
                        rowSelectorProps: { style: { margin: '10px 0' }, smallTextProps: { style: { margin: 'auto 5px' } },
                            selectProps: { iconProps: { style: { marginLeft: '10px' } } } } }}
                    onSelectRow={onSelectRow}
                    tableHeight={tableHeight}
                />
            </WrapperColumn>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    ${flex('row')};
    height: 100%;
    width: 100%;
`;
interface IWrapperColumnProps {
    columnWidth? : string; 
}
const WrapperColumn = styled.div<IWrapperColumnProps>`
    ${flex('column')};
    ${({columnWidth}) => `width: calc(100% - ${columnWidth});`}
    ${media('tablet', 'width: 100%;')}
`;
const ListWrapper = styled.div`
    display: flex;
`
const SVendorsHeader = styled(VendorsHeader)`
    margin-left: 20px;
`;
const SNavigationBar = styled(NavigationBar)`
    margin-bottom: 15px;
    margin-left: 10px;
`;