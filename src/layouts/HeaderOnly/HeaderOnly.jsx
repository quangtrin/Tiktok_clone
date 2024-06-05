import Header from '~/layouts/components/Header/Header';

function HeaderOnly({ children, options }) {
    return (
        <div>
            <Header />
            <div style={{ marginTop: 'var(--default-layout-header-height)' }}>{children}</div>
        </div>
    );
}

export default HeaderOnly;
