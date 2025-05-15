import { Button } from '@/components/atoms/actions/button';
import { MenuOption } from '@/components/atoms/actions/menu-option';
import { useNavigate } from 'react-router';
export function Header() {
    const navigate = useNavigate();
    return (
        <div className="z-50 flex flex-row justify-between items-center py-3">
            <div>
                <img src='/small-logo.svg'/>
            </div>
            <div className='flex flex-row items-center gap-3'>
                <MenuOption  onClick={()=> navigate('/login')} label="Se connecter" />
                <Button variant={'primary'} size={'small'}>
                    Essai gratuit de 7 jours
                </Button>
            </div>
        </div>
    );
}