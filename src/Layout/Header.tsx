import { useState } from 'react';
import { Container, Group, Burger, ActionIcon,useMantineColorScheme, NavLink, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import Logo  from '../logo.svg';
import { MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { BsMoonStarsFill } from "react-icons/bs";
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

const links = [
  { link: '/counter', label: 'Counter' },
  { link: '/user', label: 'User' }
];

export function Header() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(0);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const navigate = useNavigate();

    useHotkeys([['mod+J', () => toggleColorScheme()]]);



    const items = links.map((link,index) => (
        <Grid.Col                 
            key={link.label}
            span={6} 
            
        >
            <NavLink 
                href={link.link}
                label={link.label}
                display={"inline-block"}
                onClick={(e) => {
                    e.preventDefault();
                    setActive(index);
                    navigate(link.link);
                }}
                className={classes.link}
                active={index === active}
            ></NavLink>
        </Grid.Col>
    ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>

        <img src={Logo}  className={classes.logo}/>

        <Grid>
          {items}
        </Grid>
        
        <ActionIcon 
            variant="light" 
            color={dark ? 'yellow' : 'blue'}
            aria-label="Settings" 
            onClick={() => toggleColorScheme()}
        >
            {colorScheme === 'dark' ? <MdOutlineLightMode color='white' style={{ width: '70%', height: '70%' }} />:<BsMoonStarsFill color='dark' style={{ width: '70%', height: '70%' }} />}
        </ActionIcon>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}