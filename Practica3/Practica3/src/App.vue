<script setup lang="ts">
import WindowSizeDisplay from './components/Punto1/Punto1-1/WindowSizeDisplay.vue';
import ScrollToTopButton from './components/Punto1/Punto1-2/ScrollToTopButton.vue';
import ScrollProgressBar from './components/Punto1/Punto1-3/ScrollProgressBar.vue'
import UrlInspector from './components/Punto2/Punto2-1/UrlInspector.vue';
import NavigationTools from './components/Punto2/Punto2-2/NavigationTools.vue';
import SmartRedirector from './components/Punto2/Punto2-3/SmartRedirector.vue';
import BrowserInfo from './components/Punto3/Punto3-1/BrowserInfo.vue';
import OnlineStatusIndicator from './components/Punto3/Punto3-2/OnlineStatusIndicator.vue';
import ProximityDetector from './components/Punto3/Punto3-3/ProximityDetector.vue';
import CopyToClipboard from './components/Punto3/Punto3-4/CopyToClipboard.vue';
import HistoryControls from './components/Punto4/Punto4-1/HistoryControls.vue';
import TabNavigator from './components/Punto4/Punto4-2/TabNavigator.vue';
import UnsavedChangesForm from './components/Punto4/Punto4-3/UnsavedChangesForm.vue';
import InfiniteScrollList from './components/Punto4/Punto4-4/InfiniteScrollList.vue';
import DropdownMenu from './components/Punto5/Punto5-1/DropdownMenu.vue';
import FullscreenWrapper from './components/Punto5/Punto5-2/FullscreenWrapper.vue';
import PopupWindowManager from './components/Punto6/Punto6-1/PopupWindowManager.vue';
import CountdownTimer from './components/Punto7/Punto7-3/CountdownTimer.vue';
import CalendarEvent from './components/Punto7/Punto7-4/calendarEvent.vue';
</script>

<template>
  <header>
    <h1>Vue Components Test</h1>
  </header>

  <main>
    <WindowSizeDisplay />
    <ScrollToTopButton />
    <ScrollProgressBar />
    <UrlInspector />
    <NavigationTools />
    <SmartRedirector />
    <BrowserInfo />
    <OnlineStatusIndicator />
    <ProximityDetector />
    <CopyToClipboard textToCopy="kirby" />
    <HistoryControls />
    <TabNavigator />
    <UnsavedChangesForm />
    <InfiniteScrollList />
    <DropdownMenu />
    <FullscreenWrapper />
    <PopupWindowManager />
    <CountdownTimer :targetDate="new Date('2025-12-31T23:59:59')" />
    <CalendarEvent />

  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
