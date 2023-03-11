import { CheckoutInfo } from '@components/CheckoutInfo';
import { Box, Checkbox, Flex, NumberInput, Table, Title } from '@mantine/core';
import Head from 'next/head';
import { withTokenSsr } from 'utils/withToken';

function CartPage() {
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Title>Cart</Title>

      <Flex gap={16}>
        <Box sx={{ flexBasis: '66%' }}>
          <Table>
            <tbody>
              <tr>
                <td>
                  <Checkbox />
                </td>
                <td>MSI Immerse GH61 Gaming Headset</td>
                <td>$110.8</td>
                <td>
                  <NumberInput min={1} />
                </td>
              </tr>
            </tbody>
          </Table>
        </Box>
        <Box sx={{ flexBasis: '33%' }}>
          <Box component="aside" sx={{ position: 'sticky', top: 0 }}>
            <CheckoutInfo
              quantity={2}
              totalPrice={{ currency: 'USD', value: 300 }}
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default CartPage;

export const getServerSideProps = withTokenSsr(function getServerSideProps({
  req
}) {
  return { props: {} };
});
