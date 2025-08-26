import { HomeCallToActionSection } from "@/modules/home/ui/components/home-call-to-action-section";
import { HomeFeaturesSection } from "@/modules/home/ui/components/home-features-section";
import { HomeFooterSection } from "@/modules/home/ui/components/home-footer-section";
import { HomeHeaderSection } from "@/modules/home/ui/components/home-header-section";
import { HomeHeroSection } from "@/modules/home/ui/components/home-hero-section";

export const HomeView = () => {
	return (
		<>
			<HomeHeaderSection />
			<HomeHeroSection />
			<HomeFeaturesSection />
			<HomeCallToActionSection />
			<HomeFooterSection />
		</>
	);
};
