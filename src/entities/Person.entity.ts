import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index, OneToMany
} from 'typeorm';
import {Certificate} from "./certificate.entity";
import {AdditionalInformation} from "./additional-information.entity";
import {ContactInfo} from "./contact-info.entity";
import {Applicant} from "./applicant.entity";
import {Document} from "./document.entity";
import {Education} from "./education.entity";
import {Experience} from "./experience.entity";
import {LanguageInfo} from "./language-info.entity";
import {Properties} from "./properties.entity";
import {Property} from "./property.entity";
import {Skill} from "./skill.entity";

@Entity('tb_person')
export class Person {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 10, name: 'national_no' })
  national_no: string;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'first_name' })
  first_name: string;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'last_name' })
  last_name: string;

  @Column({ type: 'date', nullable: false, name: 'birth_date' })
  birth_date: Date;

  @Column({ type: 'int', nullable: false, name: 'birth_place_id' })
  birth_place_id: number;

  @Column({ type: 'int', nullable: true, name: 'location_place_id' })
  location_place_id: number;

  @Column({ type: 'int', nullable: false, name: 'sex_id' })
  sex_id: number;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'about_me' })
  aboaut_me: string;

  @Column({ type: 'varchar', length: 15, nullable: false, name: 'mobile_number' })
  mobile_number: string;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'telephone_number' })
  telephone_number: string;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'email_address' })
  email_address: string;

  @Column({ type: 'varchar', length: 200, nullable: true, name: 'address' })
  address: string;

  @Column({ type: 'char', length: 10, nullable: true, name: 'post_code' })
  post_code: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'profile_image' })
  profile_image: string;

  @Column({ type: 'timestamp', nullable: false, name: 'created_date' })
  created_date: Date;

  @OneToMany(() => Certificate,(certificates)=>certificates.person)
  certificates: Certificate[];

  @OneToMany(() => AdditionalInformation,(additionalInformations)=>additionalInformations.person)
  additionalInformations: AdditionalInformation[];

  @OneToMany(() => Applicant,(applicants)=>applicants.person)
  applicants: Applicant[];

  @OneToMany(() => ContactInfo,(contactInfos)=>contactInfos.person)
  contactInfos: ContactInfo[];

  @OneToMany(() => Document,(documents)=>documents.person)
  documents: Document[];

  @OneToMany(() => Education,(educations)=>educations.person)
  educations: Education[];

  @OneToMany(() => Experience,(experiences)=>experiences.person)
  experiences: Experience[];

  @OneToMany(() => LanguageInfo,(languageInfos)=>languageInfos.person)
  languageInfos: LanguageInfo[];

  @OneToMany(() => Properties,(properties)=>properties.person)
  properties: Properties[];

  @OneToMany(() => Property,(propertyRecords)=>propertyRecords.person)
  propertyRecords: Property[];

  @OneToMany(() => Skill,(skills)=>skills.person)
  skills: Skill[];
}